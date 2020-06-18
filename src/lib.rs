#[macro_use]
extern crate diesel;
extern crate dotenv;
extern crate chrono;
extern crate rand;

pub mod models;
pub mod schema;

use diesel::prelude::*;
use dotenv::dotenv;
use chrono::{ NaiveDateTime, Local };
use rand::{ distributions, Rng };

use std::env;
use self::models::{ CafeteriaSchema, NewCafeteriaSchema, week_month_data, get_month_data };

pub fn establish_connection() -> MysqlConnection {
    dotenv().ok();
    let database_url = env::var("DATABASE_URL").expect("Database Url must be set.");
    MysqlConnection::establish(&database_url).expect("Error : database is not connected.")
}

pub fn create_connection(conn: &MysqlConnection, data: i32, num: i32, ip: String) {
    use schema::cafeteria_data;

    let local = Local::now().naive_local();
    let keys = rand::thread_rng()
        .sample_iter(&distributions::Alphanumeric)
        .take(20)
        .collect::<String>();

    let new_schema = NewCafeteriaSchema {
        user: keys,
        data: data,
        number: num,
        ip: ip,
        date: NaiveDateTime::from(local),
    };

    diesel::insert_into(cafeteria_data::table)
        .values(&new_schema)
        .execute(conn)
        .expect("Error saving new data");
}

pub fn get_mysql_data(conn: &MysqlConnection) -> CafeteriaSchema {
    use schema::cafeteria_data;

    cafeteria_data::table.order(cafeteria_data::date.desc())
        .first(conn)
        .unwrap()
}

pub fn get_week_datas(conn: &MysqlConnection) -> week_month_data {
    use schema::numerical_statement;

    numerical_statement::table.order(numerical_statement::date.desc())
        .first(conn)
        .unwrap()
}

pub fn get_month_datas(conn: &MysqlConnection) -> get_month_data {
    use schema::get_month_data;

    get_month_data::table.order(get_month_data::date.desc())
        .first(conn)
        .unwrap()
}