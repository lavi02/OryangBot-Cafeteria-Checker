extern crate rocket;
extern crate rocket_contrib;

use rocket::response::NamedFile;
use rocket::http::{ Cookie, Cookies };
use rocket_contrib::templates;

use std::collections::HashMap;
use std::net::AddrParseError;
use std::path::{ Path, PathBuf };

#[get("/")]
pub fn index(mut cookies: Cookies) -> std::result::Result<templates::Template, AddrParseError> {
    let mut context = HashMap::new();
    context.insert("data", String::from("대전대신고 급식실 인원 알리미"));

    let cookie = Cookie::build("school_code", "G100000181")
        .path("/")
        .secure(false)
        .finish();

    cookies.add(cookie);
    serde::export::Ok(templates::Template::render("index", &context))
}

#[get("/design/<path..>")]
pub fn all_public(path: PathBuf) -> Option<NamedFile> {
    NamedFile::open(Path::new("static/").join(path)).ok()
}