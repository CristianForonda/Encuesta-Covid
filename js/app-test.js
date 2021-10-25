var progress = 0;
var pageValue = 14.3;
var question = 1;		
var dataQueryString = "{ data: {";

const queryString = window.location.search;
const keys = [];
const values = [];
const entries = new Map();

var viewData = { 
    data : {} 
};

var viewDataResponse = { 
    values : {} 
};

var jsonDataResponse = {};
var jsonData = {};

var sPageURL = queryString.substring(1),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');
    keys.push(decodeURIComponent(sParameterName[0]));
    values.push(decodeURIComponent(sParameterName[1]));
    entries.set(decodeURIComponent(sParameterName[0]),decodeURIComponent(sParameterName[1]));
};


for(var entry of entries) {
    var key = entry[0].split(" "); 
    var columnName = "";
    switch(key.length){
        case 1:
            columnName = key[0].toLowerCase(); 		
            break;
        case 2:
            columnName = key[0].toLowerCase() + toTitleCase(key[1].toLowerCase()); 		
            break;
        case 3:
            columnName = key[0].toLowerCase() + toTitleCase(key[1].toLowerCase()) + toTitleCase(key[2].toLowerCase()); 		
            break;
        case 4:
            columnName += key[0].toLowerCase() + toTitleCase(key[1].toLowerCase()) + toTitleCase(key[2].toLowerCase()) + toTitleCase(key[3].toLowerCase()); 		
            break;
        case 5:
            columnName += key[0].toLowerCase() + toTitleCase(key[1].toLowerCase()) + toTitleCase(key[2].toLowerCase()) + toTitleCase(key[3].toLowerCase()) + toTitleCase(key[4].toLowerCase()); 		
            break;
    }		
    jsonData[columnName] = entry[1];
    if(entry[0] == "Fecnac ID"){			
        var strinfec = entry[1].split("/");
        var fecnac = new Date(strinfec[0], strinfec[1]-1, strinfec[2]);
        console.log(fecnac.toISOString());			
        jsonDataResponse[entry[0]] = fecnac.toISOString();
    }else{
        jsonDataResponse[entry[0]] = entry[1];
    }
};

console.log(jsonData);

viewData.data = jsonData;

console.log(viewData);
console.log(JSON.stringify(viewData));

$( document ).ready(function() {
    if( keys.includes("NOMBRE IPS AGRUPACION") ){
        $("#ipsName").html(getUrlParameter("NOMBRE IPS AGRUPACION"));
    }
    $(".progress-bar").css("width", progress +"%");
    flatpickr.localize(flatpickr.l10ns.es);
});


window.onload = function() {
    Formio.createForm(document.getElementById('formio'), 'https://suracovid-test.form.io/encuestavacunacioncovid19eps', {
    buttonSettings: {
        showCancel: false,
        showPrevious: false,
        showNext: false,
        showSubmit: false
    }
}).then(function(form) {

    var lenguaje = {"lang": "es",
    "trans": {
        "alertMessage": "{{label}}: {{message}}",
        "complete": "Envío completo",
        "error": "Por favor corrija los siguientes errores antes de enviar.",
        "submitError": "Por favor verifique el formulario y corrija todos los errores antes de enviar.",
        "required": "{{field}} es requerido",
        "unique": "{{field}} debe ser único",
        "array": "{{field}} debe ser un matriz",
        "array_nonempty": "{{field}} debe ser una matriz no vacía",
        "nonarray": "{{field}} no debe ser una matriz",
        "select": "{{field}} contiene una selección inválida",
        "pattern": "{{field}} no coincide con el patrón {{pattern}}",
        "minLength": "{{field}} debe tener al menos {{length}} caracteres.",
        "maxLength": "{{field}} no debe tener más de {{length}} caracteres.",
        "minWords": "{{field}} debe tener al menos {{length}} palabras.",
        "maxWords": "{{field}} no debe tener más de {{length}} palabras.",
        "min": "{{field}} no puede tener menos de {{min}}.",
        "max": "{{field}} no puede tener mayor de {{max}}.",
        "invalid_email": "{{field}} debe tener un correo eléctronico válido.",
        "cancel": "Cancelar",
        "submit": "Enviar",
        "next":"Continuar",
        "previous" : "Atrás",
    }};			
    // Add Language Translations to i18n method				
    form.language = lenguaje.lang;
    form.addLanguage(lenguaje.lang, lenguaje.trans);

    form.submission = viewData; 
    
    form.on('render',function(){
        //window.setLanguage('es');
        $( ".btn-wizard-nav-next").html("Continuar &nbsp;&nbsp;");
        $("  <i class='far fa-long-arrow-right'></i>").appendTo( $( ".btn-wizard-nav-next") );				
        $( ".formio-component-queEdadTienes input[type='radio']" ).each(function( index ) {
            switch (index){
                case 0:
                    $( "<img class=' lazyloading' src='/images/young.svg' alt='18-25'>" ).prependTo( $(this).parent() );
                    break;
                case 1:
                    $( "<img class=' lazyloading' src='/images/middle.svg' alt='25-40'>" ).prependTo( $(this).parent() );	
                    break;
                case 2:
                    $( "<img class=' lazyloading' src='/images/madure.svg' alt='41-65'>" ).prependTo( $(this).parent() );	
                    break;
                case 3:
                    $( "<img class=' lazyloading' src='/images/old.svg' alt='66'>" ).prependTo( $(this).parent() );	
                    break;
            }
        });

        $( ".formio-component-genero input[type='radio']" ).each(function( index ) {
            switch (index){
                case 0:
                    $( "<img class=' lazyloading' src='/images/man.svg' alt='Masculino'>" ).prependTo( $(this).parent() );
                    break;
                case 1:
                    $( "<img class=' lazyloading' src='/images/woman.svg' alt='Femenino'>" ).prependTo( $(this).parent() );	
                    break;
            }
        });

        $( ".formio-component-teInteresariaUnSeguroDeDesercionEstudiantil input[type='radio']" ).each(function( index ) {
            switch (index){
                case 0:
                    $( "<img class=' lazyloading' src='/images/yes.svg' alt='Si'>" ).prependTo( $(this).parent() );
                    break;
                case 1:
                    $( "<img class=' lazyloading' src='/images/no.svg' alt='No'>" ).prependTo( $(this).parent() );	
                    break;
            }
        });
        
        
        $(".formio-component-radio .form-radio").addClass("grid-image grid-image--gif-v2");
        
        $(".formio-component-teAsignaronLaCitaDeVacunacionContraElCovid19 .form-radio").addClass("minus-two");
        $(".formio-component-fuisteVacunadoContraElCovid19 .form-radio").addClass("minus-two");
        $(".formio-component-tePusieronLaDosisDeLaVacunaContraElCovid19 .form-radio").addClass("minus-two");        
        $(".formio-component-dondeTePusieronLaVacunaContraElCovid19 .form-radio").addClass("minus-two");
        $(".formio-component-despuesDeLaAplicacionDeLaVacunaContraElCovid19 .form-radio").addClass("minus-item");

        $(".formio-component-enGeneralQueTanSatisfechoOInsatisfechoTeSentisteConElServicioDeVacunacionContraCovid19 .form-radio").addClass("satisfaction");
        $(".formio-component-queTanFacilODificilFueAccederAlServicioDeVacunacionContraCovid19EnAquiVaElNombreQueApareceEnElCampoNombreIpsAgrupacion .form-radio").addClass("satisfaction");
        $(".formio-component-queTanProbableEsQueRecomiendesAEpsSuraATusFamiliaresColegasAmigosOConocidos .form-radio").addClass("nps");
        $(".formio-component-asumiendoQueUnaCompaniaDiferenteAEpsSuraTeOfreceElMismoServicioQueTanProbableEsQueContinuesONoContinuesConEpsSura .form-radio").addClass("satisfaction");


        $(".formio-component-radio .form-radio .form-check-inline, .formio-component-radio .form-radio .form-check").addClass("grid-image__item");
        $( ".formio-component-radio input[type='radio']" ).each(function( index ) {
            var id = $(this).attr('id');					
            $( "#" + id ).prependTo( $(this).parent().parent()); 					
        });

        $( ".formio-component-radio label span" ).each(function( index ) {
            $(this).addClass("label-text");
            var text = $(this).html();	
            $(this).html("");
            $( "<h5>" + text + "</h5>" ).appendTo( $(this).parent()); 					
        });


        $( ".formio-component-textfield input:not(:disabled), .formio-component-textarea textarea:not(:disabled), .formio-component-currency input:not(:disabled), .formio-component-phoneNumber input:not(:disabled), .formio-component-email input:not(:disabled), .formio-component-number input:not(:disabled)" ).each(function( index ) {
            var id = $(this).attr('id');
            
            if(!$(this).parent().hasClass(id)){
                $("<label class='pure-material-textfield-outlined " + id + "'></label>").appendTo( $(this).parent()); 
                var placeholder =  $(this).attr("placeholder");
                $(this).attr("placeholder", " ");
                $("#" + $(this).attr("id")).appendTo( "." + id );				
                $("<span>" + placeholder + "</span>").appendTo("." + id );
            }
        });

        
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            $( ".formio-component-datetime input[type=date]:not(:disabled)" ).each(function( index ) {			
                var id = $(this).parent().find( "input[type=hidden]" ).attr( "id" );
                if(!(typeof id === "undefined")){
                    $("<label class='pure-material-textfield-outlined " + id + "'></label>").appendTo( $(this).parent()); 
                    var placeholder =  $(this).attr("placeholder");
                    $(this).attr("placeholder", " ");
                    $($(this)).appendTo( "." + id );				
                    $("<span>" + placeholder + "</span>").appendTo("." + id );
                }			
            });
        }else{
            $( ".formio-component-datetime input[type=text]:not(:disabled)" ).each(function( index ) {			
                var id = $(this).parent().find( "input[type=hidden]" ).attr( "id" );
                if(!(typeof id === "undefined")){
                    $("<label class='pure-material-textfield-outlined " + id + "'></label>").appendTo( $(this).parent()); 
                    var placeholder =  $(this).attr("placeholder");
                    $(this).attr("placeholder", " ");
                    $($(this)).appendTo( "." + id );				
                    $("<span>" + placeholder + "</span>").appendTo("." + id );
                }			
            });
        }

        $( ".formio-component-select select" ).each(function( index ) {
            var id = $(this).attr('id');

            if(!$(this).parent().hasClass(id)){
                $("<div class='select " + id + "'></div>").appendTo($(this).parent());
                var placeholder = $( this ).attr("placeholder");
                $( this ).addClass("select-text");	
                $( this ).attr('required','required');
                $($( this )).appendTo( $("."+ id));
                $("<label class='select-label'>" + placeholder + "</label>").appendTo( $("."+ id));
            }
        });						
    
    });
    form.on('change', function(event) {
        $(".formio-component-queEdadTienes .form-radio").addClass("grid-image grid-image--gif-v2");
        $(".formio-component-queEdadTienes .form-radio .form-check-inline").addClass("grid-image__item");

        $( ".formio-component-textfield input:not(:disabled), .formio-component-textarea textarea:not(:disabled), .formio-component-currency input:not(:disabled), .formio-component-phoneNumber input:not(:disabled), .formio-component-email input:not(:disabled), .formio-component-number input:not(:disabled)" ).each(function( index ) {
            var id = $(this).attr('id');
            
            if(!$(this).parent().hasClass(id)){
                $("<label class='pure-material-textfield-outlined " + id + "'></label>").appendTo( $(this).parent()); 
                var placeholder =  $(this).attr("placeholder");
                $(this).attr("placeholder", " ");
                $("#" + $(this).attr("id")).appendTo( "." + id );				
                $("<span>" + placeholder + "</span>").appendTo("." + id );
            }
        });

        $( ".formio-component-datetime input[type=text]:not(:disabled)" ).each(function( index ) {			
            var id = $(this).parent().find( "input[type=hidden]" ).attr( "id" );
            if(!(typeof id === "undefined")){
                $("<label class='pure-material-textfield-outlined " + id + "'></label>").appendTo( $(this).parent()); 
                var placeholder =  $(this).attr("placeholder");
                $(this).attr("placeholder", " ");
                $($(this)).appendTo( "." + id );				
                $("<span>" + placeholder + "</span>").appendTo("." + id );
            }			
        });

        $( ".formio-component-select select" ).each(function( index ) {
            var id = $(this).attr('id');

            if(!$(this).parent().hasClass(id)){
                $("<div class='select " + id + "'></div>").appendTo($(this).parent());
                var placeholder = $( this ).attr("placeholder");
                $( this ).addClass("select-text");	
                $( this ).attr('required','required');
                $($( this )).appendTo( $("."+ id));
                $("<label class='select-label'>" + placeholder + "</label>").appendTo( $("."+ id));
            }
        });						
    
    });

    form.nosubmit = true;
    form.on('gotoNextPage', function() {
        form.nextPage();
    });
    form.on('nextPage', function(page) {
        console.log(page);        
        progress += pageValue;
        $(".progress-bar").css("width", progress +"%");
        $(".progress-text").html(Math.round(progress) +"% completado");
    });
    form.on('prevPage', function() {  
        /*progress -= pageValue;
        question -= 1;
        if(question == 0){
            $(".footer__FooterWrapper").hide();
        }
        $("#footer-progress-label").html(question + labelProgress);
        $(".footer__ProgressFill").css("width",progress + "%");*/
    });
    form.nosubmit = false;
    form.on('submit', function(submission) {          
        saveSurvey(submission);
        form.nextPage();
    });
});
};

function toTitleCase(str) 
{
    return str.replace(/(?:^|\s)\w/g, function(match) {
        return match.toUpperCase();
    });
}

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (decodeURIComponent(sParameterName[0]) === sParam) {
            return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

function saveSurvey(submission)
{
    jsonDataResponse["distributionChannel"] = "email";
    jsonDataResponse["finished"] = 1;
    jsonDataResponse["progress"] = 100;
    jsonDataResponse["userLanguage"] = "ES";
    // jsonDataResponse["QID1"] = submission.data.enGeneralQueTanSatisfechoOInsatisfechoTeSentisteConElServicioDeVacunacionContraCovid19;
    // jsonDataResponse["QID2"] = submission.data.queTanFacilODificilFueAccederAlServicioDeVacunacionContraCovid19EnAquiVaElNombreQueApareceEnElCampoNombreIpsAgrupacion;
    // jsonDataResponse["QID3"] = submission.data.queTanProbableEsQueRecomiendesAEpsSuraATusFamiliaresColegasAmigosOConocidos;
    // jsonDataResponse["QID4"] = submission.data.asumiendoQueUnaCompaniaDiferenteAEpsSuraTeOfreceElMismoServicioQueTanProbableEsQueContinuesONoContinuesConEpsSura;
    jsonDataResponse["QID5_TEXT"] = submission.data.tienesAlgunComentarioOSugerencia;
    jsonDataResponse["QID6"] = submission.data.teAsignaronLaCitaDeVacunacionContraElCovid19;
    jsonDataResponse["QID7"] = submission.data.fuisteVacunadoContraElCovid19;
    

    if(submission.data.fuisteVacunadoContraElCovid19 == 1){
        jsonDataResponse["QID16"] = submission.data.tePusieronLaDosisDeLaVacunaContraElCovid19; 

        if( submission.data.tePusieronLaDosisDeLaVacunaContraElCovid19 == 2 ){
            jsonDataResponse["QID21"] = submission.data.queDosisDeLaVacunaContraElCovid19TeAplicaron; 
        }

        jsonDataResponse["QID15"] = submission.data.dondeTePusieronLaVacunaContraElCovid19 ; 
        jsonDataResponse["QID11"] = submission.data.despuesDeLaAplicacionDeLaVacunaContraElCovid19; 

        if(submission.data.despuesDeLaAplicacionDeLaVacunaContraElCovid19 == 3){
            jsonDataResponse["QID11_7_TEXT"] = submission.data.porQue; 
        }
    }			
    
    viewDataResponse.values = jsonDataResponse;			

    console.log(viewDataResponse);
    console.log(JSON.stringify(viewDataResponse));

    //ID pruebas: SV_9sNElFbwmPwniqq
    //ID produccion: SV_dma7VEWO6ZSpduC

    var settings = {
        "url": "https://sjc1.qualtrics.com/API/v3/surveys/SV_9sNElFbwmPwniqq/responses",
        "method": "POST",
        "timeout": 0,
        "data": JSON.stringify(viewDataResponse),
        "headers": {
            "X-API-TOKEN": "CMDvrgORwjc9eMU2AFHComUi4zIyVAaRK6qAIOTQ",
            "Content-Type": "application/json"
        }				
    };



    $.ajax(settings).done(function (response) {
        console.log(response);
    });	
}