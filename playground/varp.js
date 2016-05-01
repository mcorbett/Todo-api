var grades=[15,37];

function update_grades (obj) {
    obj.push(77);
}

function update_obj (obj) {
    obj=[15,37,77];
}

update_obj(grades);

console.log(grades);

update_grades(grades);

debugger;

console.log(grades);
