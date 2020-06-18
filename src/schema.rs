table! {
    cafeteria_data (user) {
        user -> Varchar,
        data -> Integer,
        number -> Integer,
        ip -> Varchar,
        date -> Datetime,
    }
}

table! {
    get_month_data (code) {
        state -> Varchar,
        count -> Integer,
        code -> Varchar,
        date -> Datetime,
    }
}

table! {
    numerical_statement (code) {
        state -> Varchar,
        count -> Integer,
        code -> Varchar,
        date -> Datetime,
    }
}

allow_tables_to_appear_in_same_query!(
    cafeteria_data,
    get_month_data,
    numerical_statement,
);
