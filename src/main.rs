#![feature(plugin)]
#![feature(proc_macro_hygiene, decl_macro)]
#[macro_use]
extern crate rocket_contrib;
#[macro_use]
extern crate rocket;
extern crate diesel;
extern crate serde;
extern crate serde_json;
extern crate serde_derive;

use std::string::String;
use serde::{ Serialize, Deserialize };

use rocket::request::Request;
use rocket::response::{ Response, Responder, Result };
use rocket::http::{ Status, ContentType };
use rocket_client_addr::ClientRealAddr;
use rocket_contrib::templates;
use rocket_contrib::json::{ Json, JsonValue };

use schoolwork::create_connection;
use schoolwork::establish_connection;
use schoolwork::{ get_mysql_data, get_month_datas, get_week_datas };
use schoolwork::models::{ CafeteriaSchema, week_month_data, get_month_data };

pub mod front;
pub mod nugu_api;
pub mod google_assistant_api;
pub mod bixby_api;
pub mod school_schedule_month;

#[derive(Serialize, Deserialize)]
pub struct ApiType {
    person_data: i32,
    api_data: i32,
    api_ver_check: i32,
}

#[derive(Serialize, Deserialize)]
pub struct ErrorMessage {
    data: String,
    text: String,
    name: String,
}

pub struct ApiResponse {
    json: JsonValue,
    status: Status,
}

impl<'r> Responder<'r> for ApiResponse {
    fn respond_to(self, req: &Request) -> Result<'r> {
        Response::build_from(self.json.respond_to(&req).unwrap())
            .status(self.status)
            .header(ContentType::JSON)
            .ok()
    }
}

#[get("/api/v1/getdata")]
pub fn get_data() -> ApiResponse {
    let data: [i32; 3];
    let cafeteria_data: CafeteriaSchema = get_mysql_data(&establish_connection());
    let week_data: week_month_data = get_week_datas(&establish_connection());
    let month_data: get_month_data = get_month_datas(&establish_connection());

    data = [cafeteria_data.number, week_data.count, month_data.count];
    ApiResponse {
        json: json! ({
            "person_num": data,
            "data": cafeteria_data.data
        }),
        status: Status::Ok
    }
}

#[post("/api/v1/insertdata", format = "application/json", data = "<data>")]
pub fn receive_api(data: Json<ApiType>, remote_addr: ClientRealAddr) -> ApiResponse {
    let client_ipv4: String = remote_addr.get_ipv4_string().expect("check ipv6");
    let client_ipv6: String = remote_addr.get_ipv6_string();
    let client: String;

    let ip_error: String = String::from("unknown ip players _ DNS");
    let no_hack: String = String::from("local players _ SET localhost");

    if client_ipv4.is_empty() == true { client = client_ipv6 }
    else {
        if client_ipv4 == String::from("127.0.0.1") { client = no_hack }
        else if client_ipv4 == String::from("localhost") { client = no_hack }
        else if client_ipv4 == String::from("0.0.0.0") { client = no_hack }
        else if client_ipv4 == String::from("8.8.8.8") { client = ip_error }
        else if client_ipv4 == String::from("1.1.1.1") { client = ip_error }
        else { client = client_ipv4 }
    }

    let status_data: String;
    let result: String;
    let status_point: Status;

    if data.0.api_ver_check != 1064099941 {
        status_data = String::from("Unknown Data Type or Form.");
        result = String::from("your token is something wrong.");
        status_point = Status::new(401, "Invalid Data");
    }

    else if data.0.api_data < 0 {
        status_data = String::from("Unknown Data Type or Form.");
        result = String::from("your token is something wrong.");
        status_point = Status::new(400, "Bad Request");
    }

    else if data.0.api_data > 100 {
        status_data = String::from("Unknown Data Type or Form.");
        result = String::from("your token is something wrong.");
        status_point = Status::new(400, "Bad Request");
    }

    else {
        create_connection(&establish_connection(), data.0.api_data, data.0.person_data, client);
        status_data = String::from("success!");
        result = String::from("Successfully Generated.");
        status_point = Status::Ok;
    }

    ApiResponse {
        json: json! ({
            "status": &status_data,
            "data": &result
        }),
        status: status_point
    }
}


#[catch(404)]
pub fn no_page() -> templates::Template {
    let context = ErrorMessage {
        data: String::from("404"),
        text: String::from("PAGE NOT FOUND"),
        name: String::from("Page Not Found"),
    };

    templates::Template::render("error", &context)
}

#[catch(403)]
pub fn privilege() -> templates::Template {
    let context = ErrorMessage {
        data: String::from("404"),
        text: String::from("PAGE NOT FOUND"),
        name: String::from("Page Not Found")
    };

    templates::Template::render("error", &context)
}

#[catch(422)]
pub fn json_post_error() -> ApiResponse {
    ApiResponse {
        json: json! ({
            "status": "your request is something wrong.",
            "data": "Unknown Data Type or Form."
        }),
        status: Status::new(400, "Bad Request")
    }
}

#[catch(500)]
pub fn understand_error() -> templates::Template {
    let context = ErrorMessage {
        data: String::from("500"),
        text: String::from("INTERNAL SERVER ERROR"),
        name: String::from("Internal Server Error")
    };

    templates::Template::render("error", &context)
}

fn main() {
    rocket::ignite()
        .mount("/", routes![get_data, receive_api, front::index, front::all_public, nugu_api::get_breakfast])
        .attach(templates::Template::fairing())
        .register(catchers![no_page, privilege, understand_error, json_post_error])
        .launch();
}
