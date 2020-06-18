let get_cookie_data = () => {
    let value = "; " + document.cookie;
    let parts_of_cookie = value.split("; " + "school_code" + "=");

    if (parts_of_cookie.length === 2) {
        return parts_of_cookie.pop().split(";").shift();
    }

    else {
        alert("쿠키 사용을 활성화하여 주세요!");
    }
};
let get_year_data = () => {
    let date = new Date();
    return date.getFullYear();
};
let get_month_data = () => {
    let date = new Date();
    return (date.getMonth() + 1);
};
let get_day_data = () => {
    let date = new Date();
    return date.getDate();
};
let get_hours_data = () => {
    let date = new Date();
    return date.getHours();
};

const createElementP = (content) => {
    const div = document.getElementsByClassName("menu")[0];
    const createP = document.createElement("p");
    createP.innerHTML += content;

    return div.appendChild(createP);
};

fetch(`https://schoolmenukr.ml/api/high/${get_cookie_data()}?year=${get_year_data()}&month=${get_month_data()}&date=${get_day_data()}`, {
    method: "GET"
}).then(res => res.json()).then(data => {
    if (get_hours_data() >= 0 && get_hours_data() < 9) {
        let breakfast = data.menu[0].breakfast;

        if (breakfast.length !== 0) {
            for (i = 0; i < breakfast.length; i++)
            {
                createElementP(breakfast[i]);
            }

            console.clear();
        }

        else {
            createElementP("*오늘 아침의 급식은 없습니다.*");
            console.clear();
        }
    }

    else if (get_hours_data() >= 9 && get_hours_data() < 14) {
        let lunch = data.menu[0].lunch;

        if (lunch.length !== 0) {
            for (i = 0; i < lunch.length; i++)
            {
                createElementP(lunch[i]);
            }

            console.clear();
        }

        else {
            createElementP("*오늘 점심의 급식은 없습니다.*");
           console.clear();
        }
    }

    else {
        let dinner = data.menu[0].dinner;

        if (dinner.length !== 0) {
            for (i = 0; i < dinner.length; i++)
            {
                createElementP(dinner[i]);
            }

            console.clear();
        }

        else {
            createElementP("*오늘 저녁의 급식은 없습니다.*");
            console.clear();
        }
    }
}).catch((err) => {
    createElementP("급식 정보를 가져오는 데에 오류가 발생하였습니다." + err.toString());

    console.clear();
    throw err;
});