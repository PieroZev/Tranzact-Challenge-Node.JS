$(document).ready(() =>{

if(userLang === undefined) var userLang = navigator.language || navigator.userLanguage;

populatePage(userLang);
changeLanguageButtons();
onChangeInputFields();
onClickButton();

});

var fillSelect = (path, select, userLang) =>{
    $(select).html("");
    if(userLang === "es" || userLang === "es-419" || userLang === "es-US" || userLang === "es-ES") 
    $(select).append("<option value ='-1'>Seleccione</option>");
    else if(userLang === "de") $(select).append("<option value ='-1'>Auswählen</option>");
    else $(select).append("<option value ='-1'>Select</option>");
    $.ajax({
		url:"http://localhost:5000" + path,
		method:"GET",
		dataType:"json"
		
	}).done((data)=>{
		$.each(data,(index,value)=>{
            if(select != "#period"){
                $(select).append("<option value="+ index +">"+ value +"</option>");
            }
            else{
                let valueLanguage;
                if(userLang === "es" || userLang === "es-419" || userLang === "es-US" || userLang === "es-ES") valueLanguage = value.ES;
                else if(userLang === "de") valueLanguage = value.DE;
                else valueLanguage = value.EN;
                $(select).append("<option value="+ index +">"+ valueLanguage +"</option>");
            }
		});
    }).fail((jqXHR, textStatus, errorThrown)=>{
        ajaxError(jqXHR, textStatus);
    });
	
}

var fillTable = (path, tableBody)=>{

var dob = $("#birthDate").val() + "";
var state = $("#state").find("option:selected").text();
var age = $("#age").val() + "";
var plan = $("#plan").find("option:selected").text();
var period = $("#period").val();
$("#lbl-dob-error").css("display","none");
$("#lbl-state-error").css("display","none");
$("#lbl-age-error").css("display","none");
$("#lbl-plan-error").css("display","none");
$("#lbl-period-error").css("display","none");

var jsonData = {
    "birthDate" :   dob,
    "state"     :   state,
    "age"       :   age,   
    "plan"      :   plan
}

    if(dob === undefined || state === undefined || age === undefined || plan === undefined || period === undefined){
        console.log(stringUndefined);
        return false;
    }
    else if(dob.trim() === "" || $("#state").val() === "-1" || $("#plan").val() === "-1" || period === "-1"){
        if(dob.trim() === ""){
            $("#lbl-dob-error").css("display","block");
        }
        if($("#state").val() === "-1"){
            $("#lbl-state-error").css("display","block");
        }
        if(age <18 || age > 120){
            $("#lbl-age-error").css("display","block");
        }
        if($("#plan").val() === "-1"){
            $("#lbl-plan-error").css("display","block");
        }
        if(period === "-1"){
            $("#lbl-period-error").css("display","block");
        }
        return false;
        }
    else{
        $.ajax({
            url:"http://localhost:5000" + path,
            method:"POST",
            dataType:"json",
            data: jsonData
        }).done((data)=>{
            $(tableBody).html("");
            $.each(data,(index,value)=>{

                var monthCost = 0;

                switch (period){
                    case '0': monthCost = value.premium;
                        break;
                    case '1': monthCost = Math.round(value.premium / 3 *100)/100;
                        break;
                    case '2': monthCost = Math.round(value.premium / 6 *100)/100;
                        break;
                    case '3': monthCost = Math.round(value.premium / 12 *100)/100;
                        break;
                    default: $("#lbl-period-error").html(stringPeriodNotSelected);
                    break;
                }

                var annualCost = Math.round(monthCost*12*100)/100;
                $(tableBody).append("<tr><td>"+value.carrier+"</td><td>"+value.premium+"</td><td>"+annualCost+"</td><td>"+monthCost+"</td></tr>");

            });
        }).fail((jqXHR, textStatus, errorThrown)=>{
            ajaxError(jqXHR, textStatus);
        });
    }
}

var ajaxError = (jqXHR, textStatus)=>{
    switch (jqXHR.status) {

        case 0 : console.log(errorConnection);
        break;

        case 404 : console.log(errorNotFound);
        break;

        case 500 : console.log(errorServer);
        break;

        default: switch (textStatus){
            case "parsererror" : console.log(errorParseJson);
            break;

            case "timeout" : console.log(errorTimeout);
            break;

            case "abort" : console.log(errorAbort);
            break;

            default: console.log(errorUncaught + jqXHR.responseText);
            break;
        }
        break;
    }
}

var calculateAge = (dob)=>{

    var date = new Date(dob);
    var diff_ms = Date.now() - date.getTime();
    var age_dt = new Date(diff_ms); 

    return parseInt(Math.abs(age_dt.getUTCFullYear() - 1970)+"");
}

var populatePage = (userLang)=>{

    $('[lang="en"]').hide();
    $('[lang="es"]').hide();
    $('[lang="de"]').hide();

    if(userLang === "es" || userLang === "es-419" || userLang === "es-US" || userLang === "es-ES"){
        document.title = title_es;
        $('[lang="es"]').show();
        $("#btn-english").css("background-color","white");
        $("#btn-english").css("color","black");
        $("#btn-german").css("background-color","white");
        $("#btn-german").css("color","black");
        $("#state").css("margin-left","155px");
        $("#age").css("margin-left","167px");
        $("#lbl-dob-error").css("margin-left", "215px");
        $("#lbl-state-error").css("margin-left", "215px");
        $("#lbl-plan-error").css("margin-left", "485px");
        $("#lbl-age-error").css("margin-left", "215px");
        $("#lbl-period-error").css("margin-left", "200px");
        
    } else if(userLang === "de"){
        document.title = title_de;
        $('[lang="de"]').show();
        $("#btn-english").css("background-color","white");
        $("#btn-english").css("color","black");
        $("#btn-spanish").css("background-color","white");
        $("#btn-spanish").css("color","black");
        $("#state").css("margin-left","112px");
        $("#age").css("margin-left","122");
        $("#lbl-dob-error").css("margin-left", "160px");
        $("#lbl-state-error").css("margin-left", "160px");
        $("#lbl-plan-error").css("margin-left", "440px");
        $("#lbl-age-error").css("margin-left", "160px");
        $("#lbl-period-error").css("margin-left", "230px");
    }else{
        document.title = title_en;
        $('[lang="en"]').show();
        $("#btn-spanish").css("background-color","white");
        $("#btn-spanish").css("color","black");
        $("#btn-german").css("background-color","white");
        $("#btn-german").css("color","black");
        $("#state").css("margin-left","105px");
        $("#age").css("margin-left","112px");
        $("#lbl-dob-error").css("margin-left", "150px");
        $("#lbl-state-error").css("margin-left", "150px");
        $("#lbl-plan-error").css("margin-left", "420px");
        $("#lbl-age-error").css("margin-left", "150px");
        $("#lbl-period-error").css("margin-left", "160px");
    }

    $("#lbl-dob-error").css("display","none");
    $("#lbl-state-error").css("display","none");
    $("#lbl-age-error").css("display","none");
    $("#lbl-plan-error").css("display","none");
    $("#lbl-period-error").css("display","none");

    fillSelect(urlStates, "#state", userLang, "-1");
    fillSelect(urlPeriods, "#period", userLang, "-1");
    fillSelect(urlPlans, "#plan", userLang, "-1");
}

var changeLanguageButtons = ()=>{

    $("#btn-english").click(()=>{
        $('[lang="es"]').hide();
        $('[lang="de"]').hide();
        $('[lang="en"]').show();
        $("#btn-spanish").css("background-color","white");
        $("#btn-spanish").css("color","black");
        $("#btn-german").css("background-color","white");
        $("#btn-german").css("color","black");
        $("#btn-english").css("background-color","black");
        $("#btn-english").css("color","white");
        $("#state").css("margin-left","105px");
        $("#age").css("margin-left","112px");
        $("#lbl-dob-error").css("margin-left", "150px");
        $("#lbl-state-error").css("margin-left", "150px");
        $("#lbl-plan-error").css("margin-left", "420px");
        $("#lbl-age-error").css("margin-left", "150px");
        $("#lbl-period-error").css("margin-left", "160px");
        
        userLang = "en";
        fillSelect(urlStates, "#state", userLang);
        fillSelect(urlPeriods, "#period", userLang);
        fillSelect(urlPlans, "#plan", userLang);
    });

    $("#btn-spanish").click(()=>{
        $('[lang="en"]').hide();
        $('[lang="de"]').hide();
        $('[lang="es"]').show();
        $("#btn-english").css("background-color","white");
        $("#btn-english").css("color","black");
        $("#btn-german").css("background-color","white");
        $("#btn-german").css("color","black");
        $("#btn-spanish").css("background-color","black");
        $("#btn-spanish").css("color","white");
        $("#state").css("margin-left","155px");
        $("#age").css("margin-left","167px");
        $("#lbl-dob-error").css("margin-left", "215px");
        $("#lbl-state-error").css("margin-left", "215px");
        $("#lbl-plan-error").css("margin-left", "485px");
        $("#lbl-age-error").css("margin-left", "215px");
        $("#lbl-period-error").css("margin-left", "200px");
        
        userLang = "es";
        fillSelect(urlStates, "#state", userLang);
        fillSelect(urlPeriods, "#period", userLang);
        fillSelect(urlPlans, "#plan", userLang);
    });

    $("#btn-german").click(()=>{
        $('[lang="en"]').hide();
        $('[lang="es"]').hide();
        $('[lang="de"]').show();
        $("#btn-english").css("background-color","white");
        $("#btn-english").css("color","black");
        $("#btn-spanish").css("background-color","white");
        $("#btn-spanish").css("color","black");
        $("#btn-german").css("background-color","black");
        $("#btn-german").css("color","white");
        $("#state").css("margin-left","112px");
        $("#age").css("margin-left","122px");
        $("#lbl-dob-error").css("margin-left", "160px");
        $("#lbl-state-error").css("margin-left", "160px");
        $("#lbl-plan-error").css("margin-left", "440px");
        $("#lbl-age-error").css("margin-left", "160px");
        $("#lbl-period-error").css("margin-left", "230px");
        
        userLang = "de";
        fillSelect(urlStates, "#state", userLang);
        fillSelect(urlPeriods, "#period", userLang);
        fillSelect(urlPlans, "#plan", userLang);
    });
}

var onChangeInputFields = ()=>{

    $("#birthDate").change(()=>{
        let dob = new Date($("#birthDate").val());
        let now = new Date();

        $("#lbl-dob-error").css("display","none");
        $("#lbl-age-error").css("display","none");
        $("#age").val(calculateAge($("#birthDate").val()));
        if($("#birthDate").val() === "" || dob.getUTCFullYear() > now.getUTCFullYear()){
            $("#lbl-dob-error").css("display","block");
            $("#birthDate").val("dd/mm/aaaa");
            $("#age").val("0");
        }
        if($("#age").val() <18 || $("#age").val() > 120){
            $("#lbl-age-error").css("display","block");
        }
    });
    
    $("#state").change(()=>{
        fillTable(urlPremium, "#premium-body");
    });
    
    $("#plan").change(()=>{
        fillTable(urlPremium, "#premium-body");
    });
    
    $("#period").change(()=>{
        fillTable(urlPremium, "#premium-body");
    });
}

var onClickButton = ()=>{
    $("#form-btn").click(()=>{
        fillTable(urlPremium, "#premium-body");
    });
}