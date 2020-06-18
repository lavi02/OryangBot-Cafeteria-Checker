use serde::{ Serialize, Deserialize };

use rocket::request::Request;
use rocket::response::{ Response, Responder, Result };
use rocket::http::{ Status, ContentType };
use rocket_contrib::json::{ Json, JsonValue };

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

#[get("/api/v1/getschooldata")]
pub fn schedule() -> ApiResponse {
    ApiResponse {
        json: json! ({
            "version": "2.0",
            "resultCode": "Ok"
        }),
        status: Status::Ok
    }
}