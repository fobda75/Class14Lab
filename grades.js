let valid1 =false;
let valid2 = false;
let valid3 =false;
let valid4 = false;
let gradeBook=[];
$(document).ready(function () {
    $("#submitButton").click(storeGrade);
    $("#sortByName").on("click",nameSort);
    $("#sortByPercent").on("click",percentSort)
})
function storeGrade(event) {
    event.preventDefault();

    //Validate First Name
    if ($("#studentFirstName").val() == ""){
        $("#studentFirstNameCorrection").text("The first name cannot be left blank.");
        valid1 = false;
    }
    else {
        $("#studentFirstNameCorrection").text("");
        valid1 =true;
    }

    //Validate Last Name
    if ($("#studentLastName").val() == ""){
        $("#studentLastNameCorrection").text("The last name cannot be left blank.");
        valid2 = false;
    }
    else {
        $("#studentLastNameCorrection").text("");
        valid2 =true;
    }


    //Validate earned points
    if ($("#pointsEarned").val() > 500) {
        $("#pointsEarned").val("");
        $("#pointsEarnedCorrection").text("The maximum number of points is 500.");
        valid3 = false;
    }
    else if ($("#pointsEarned").val() < 0) {
        $("#pointsEarned").val("");
        $("#pointsEarnedCorrection").text("The minimum number of points is 0.");
        valid3 = false;
    }
    else if (parseInt($("#pointsEarned").val()) >  parseInt($("#pointsPossible").val())){
        $("#pointsEarnedCorrection").text("The earned points cannot be greater than the possible points.");
        valid3 = false;
    }
    else {
        $("#pointsEarnedCorrection").text("");
        valid3 =true;
    }

    //Validate Possible points
    if ($("#pointsPossible").val() > 500) {
        $("#pointsPossible").val("");
        $("#pointsPossibleCorrection").text("The maximum number of points is 500.");
        valid4=false;
    } else if ($("#pointsPossible").val() < 0) {
        $("#pointsPossible").val("");
        $("#pointsPossibleCorrection").text("The minimum number of points is 0.");
        valid4=false;
    } else {
        $("#pointsPossibleCorrection").text("");
        valid4=true;
    }
    if(valid1 && valid2 && valid3 && valid4){
        let grade = {
            firstName: $("#studentFirstName").val(),
            lastName: $("#studentLastName").val(),
            earnedPoints: $("#pointsEarned").val(),
            possiblePoints: $("#pointsPossible").val()
        };
        $("#studentFirstName").val("");
        $("#studentLastName").val("");
        $("#pointsEarned").val("");
        $("#pointsPossible").val("");
        gradeBook.push(grade);
        displayGrades(gradeBook);
    }

}

function displayGrades(arrayName) {
    $("#dataDisplay").empty()
    for(let object of arrayName){
        let score = ((object.earnedPoints / object.possiblePoints) *100).toFixed(2);
        let letterGrade;
        if (score>=90){
            letterGrade = "A";
        }
        else if (score>=80){
            letterGrade = "B";
        }
        else if (score>=70){
            letterGrade ="C";
        }
        else if (score >= 60){
            letterGrade = "D";
        }
        else{
            letterGrade ="F";
        }
        let message = `${object.lastName}, ${object.firstName}: 
            ${object.earnedPoints}/${object.possiblePoints}: ${score}% 
            ${letterGrade}<br>`;
        $("#dataDisplay").append(message);
    }

}

function nameSort(){
    gradeBook.sort(sortByName);
    displayGrades(gradeBook);
}

function percentSort(){
    gradeBook.sort(sortByPercent);
    displayGrades(gradeBook);
}

function sortByName(a,b){
    let nameA=`${a.lastName.toUpperCase()}, ${a.firstName.toUpperCase()}`;
    let nameB=`${b.lastName.toUpperCase()}, ${b.firstName.toUpperCase()}`;
    if (nameA < nameB){
        return -1;
    }
    else if (nameA > nameB){
        return 1;
    }
    else{
        return 0;
    }

}

function sortByPercent(a,b){
    let percentA = a.earnedPoints/a.possiblePoints;
    let percentB = b.earnedPoints/b.possiblePoints;
    if (percentA < percentB){
        return 1;
    }
    else if (percentA > percentB){
        return -1;
    }
    else{
        return 0;
    }

}