#![allow(non_camel_case_types)]
extern crate chrono;

use crate::schema::*;

#[derive(Queryable)]
pub struct CafeteriaSchema {
    pub user: String,
    pub data: i32,
    pub number: i32,
    pub ip: String,
    pub date: chrono::NaiveDateTime,
}

#[derive(Insertable)]
#[table_name = "cafeteria_data"]
pub struct NewCafeteriaSchema {
    pub user: String,
    pub data: i32,
    pub number: i32,
    pub ip: String,
    pub date: chrono::NaiveDateTime,
}

#[derive(Queryable)]
pub struct week_month_data {
    pub state: String,
    pub count: i32,
    pub code: String,
    pub date: chrono::NaiveDateTime,
}

#[derive(Queryable)]
pub struct get_month_data {
    pub state: String,
    pub count: i32,
    pub code: String,
    pub date: chrono::NaiveDateTime,
}