use serde::{ Serialize, Deserialize };
use rocket::request::Request;
use rocket::response::{ Response, Responder, Result };
use rocket::http::{ Status, ContentType };
use rocket_contrib::json::{ Json, JsonValue };

use reqwest;
use reqwest::header::HeaderMap;

use schoolwork::create_connection;
use schoolwork::establish_connection;
use schoolwork::{ get_mysql_data, get_month_datas, get_week_datas };
use schoolwork::models::{ CafeteriaSchema, week_month_data, get_month_data };

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

#[derive(Debug, Serialize, Deserialize)]
pub struct NuguApiDataAction {
    actionName: String
}

#[derive(Debug, Serialize, Deserialize)]
pub struct NuguApiDataDevice {
    r#type: String
}

#[derive(Debug, Serialize, Deserialize)]
pub struct NuguApiDataContext {
    device: NuguApiDataDevice
}

#[derive(Debug, Deserialize)]
pub struct NuguApiData {
    action: NuguApiDataAction,
    context: NuguApiDataContext
}

#[get("/api/v1/nugu/health")]
pub fn get_test() -> ApiResponse {
    ApiResponse {
        json: json! ({
            "version": "2.0",
            "resultCode": "Ok"
        }),
        status: Status::Ok
    }
}

#[post("/api/v1/nugu/breakfast", format = "application/json", data = "<data>")]
pub fn get_breakfast(data: Json<NuguApiData>) -> ApiResponse {
    let statusCode: String;
    let _data: String;
    let _sid: String;
    
    let req = reqwest::Client::new();
    let mut headers = HeaderMap::new();
    let uri: String = String::from("https://open.neis.go.kr/hub/SchoolSchedule?KEY=aace01248cce42aba5139ad60891f7a0&Type=json&ATPT_OFCDC_SC_CODE=G10&SD_SCHUL_CODE=7430048");
    let cafeteria_data: CafeteriaSchema = get_mysql_data(&establish_connection());

    println!("{:?}", &data);

    let result = cafeteria_data.number.to_string();
    
    ApiResponse {
        json: json! ({
            "version": "2.0",
            "resultCode": "OK",
            "output": {
                "breakfast": result
            }
        }),
        status: Status::Ok
    }
}
