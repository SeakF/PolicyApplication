module.exports = ({clientCompany, name, surname, address, company, typeDetailSt, typeDetailNd, typeDetail5Th, policyNumber, policyDateSet, policyDateEnd, policyType}) => {

    let companyAddress 
    switch (company) {
        case 'Allianz':
            companyAddress = 'ul. Rodziny Hiszpańskich 1 02-685 Warszawa'
            break;
        case 'Aviva':
            companyAddress = 'ul. Inflacka 4a 00-189 Warszawa'
            break;
        case 'Axa':
            companyAddress = 'ul. Chłodna 51 00-867 Warszawa'
            break;
        case 'Balcia':
            companyAddress = 'al. Jerozolimskie 136 02-305 Warszawa'
            break;
        case 'Benefia':
            companyAddress = 'al. Jerozolimskie 162 02-342 Warszawa'
            break;
        case 'Bre Ubezpieczenia (mBank)':
            companyAddress = 'ul. Ks. I.Skorupki 5 00-963 Warszawa'
            break;
        case 'Compensa':
            companyAddress = 'al. Jerozolimskie 162 02-342 Warszawa'
            break;
        case 'Concordia':
            companyAddress = 'ul. S.Małachowskiego 10 61-129 Poznań'
            break;
        case 'Ergo Hestia':
            companyAddress = 'ul. Hestii 1 81-731 Sopot'
            break;
        case 'Gefion':
            companyAddress = 'Polins sp. z o.o. ul. G. Narutowicza 18 99-320 Żychlin'
            break;
        case 'Generali':
            companyAddress = 'ul. Postępu 15B 02-676 Warszawa'
            break;
        case 'Gothaer':
            companyAddress = 'ul. Wołoska 22A 02-675 Warszawa'
            break;
        case 'WIENER':
            companyAddress = 'ul. Wołoska 22A 02-675 Warszawa'
            break;
        case 'InterRisk':
            companyAddress = 'ul. Noakowskiego 22 00-668 Warszawa'
            break;
        case 'Link4':
            companyAddress = 'ul. Postępu 15 02-676 Warszawa'
            break;
        case 'MTU':
            companyAddress = 'ul. Hestii 1 81-731 Sopot'
            break;
        case 'Proama':
            companyAddress = 'ul. Szeligowskiego 6 20-883 Lublin'
            break;
        case 'PZU':
            companyAddress = 'ul. Jana Pawła II 24 00-133 Warszawa'
            break;
        case 'TUW Pocztowe':
            companyAddress = 'ul. Mickiewicza 19 26-600 Radom'
            break;
        case 'TUW TUW':
            companyAddress = 'ul. Raabego 13 02-793 Warszawa'
            break;
        case 'TUW WUZ':
            companyAddress = 'ul. Bokserska 66 02-690 Warszawa'
            break;
        case 'Uniqa':
            companyAddress = 'ul. Gdańska 132, 90-520 Łódź'
            break;
        case 'VH Polska':
            companyAddress = 'ul. Grunwaldzka 186 60-166 Poznań'
            break;
        case 'Warta/HDI':
            companyAddress = 'ul. Chmielna 85/87 00-805 Warszawa'
            break;
        case 'You Can Drive':
            companyAddress = 'ul. Hestii 1 81-731 Sopot'
            break;
    
        default:
            break;
    }

    const simplifyDate = (inputedDate) => {
        let date = new Date(inputedDate)

        let day = date.getDate()
        let month = date.getMonth()+1
        let year = date.getFullYear()

        if (day < 10) {
            day = '0' + day
        }
        if (month < 10) {
            month = '0' + month
        }

        return `${day}-${month}-${year}`
    }


    if (policyType != "gospodarcza") {
        return `
<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <title>PDF Template</title>
    <style>
        .pdf-box {
            max-width: 400pt;
            margin: auto;
            padding: 15pt;
            line-height: 11pt;
            font-family: 'Helvetica Neue', 'Helvetica';
        }

        .client-data {
            display: -webkit-flex;
        }
        .column {
            width: 200pt;
        }
        .column:last-child {
            display: -webkit-flex;
            justify-content: -webkit-flex-end;
        }
        .form {
            border-top: 1pt solid black;
            font-size: 6pt;
            width: 162pt;
        }

        .margin-top {
            margin-top: 35pt;
        }

        .company-data {
            padding-left: 206pt;
        }

        .text {
            margin-top: 10pt;
        }
        .center {
            text-align: center;
        }
        .small-font {
            font-size: 6pt;
        }
        .text > p {
            font-size: 7pt;
        }
        .signature {
            padding-left: 180pt;
            margin-top: 45pt;
        }
        .smaller-font {
            font-size: 5pt;
        }
        .detail-option {
            display: -webkit-flex;
            margin-top: 7pt;
        }
        .detail-option-column:nth-child(1) {
            width: 40pt;
            text-align: center;
            font-size: 4pt;
            padding-top: 15pt;
        }
        .detail-option-column:nth-child(1) > div {
            width: 15pt;
            height: 15pt;
            border-radius: 3pt;
            border: 1pt solid rgb(36, 36, 36);
            background-color: rgba(128, 128, 128, 0.4);
            margin: auto;
        }
        .detail-option-column:nth-child(2) {
            padding-left: 5pt;
            width: 360pt;
        }
        ul {
            margin-top: -5pt;
            margin-left: -15pt;
            list-style-type: '- ';
        }
        .space {
            height: 20pt;
        } 
        .space-inner {
            min-height: 10pt;
            font-size: 8pt;
        }

        .date-font {
            font-size: 8pt;
        }
    </style>
</head>

<body>
    <section class="pdf-box">
        <arcticle class="client-data">
            <div class="column">
                <div class="space">
                    <div class="space-inner">
                        <span class="margin-top">${clientCompany || `${name} ${surname}`}</span>
                    </div>
                    <div class="form">
                        imie i nazwisko ubezpieczonego / firma
                    </div>
                </div>
                <div class="space">
                    <div class="space-inner">
                        <span class="margin-top">${(address == '-' || address == null) ? '' : address}</span>
                    </div>
                    <div class="form">
                        adres
                    </div>
                </div>
            </div>
            <div class="column">
                <div>
                    <span class="margin-top date-font">Biszcza, dnia ____________________________</span>
                </div>
            </div>
        </arcticle>
        <article class="company-data">
            <div>
                <div class="space">
                    <div class="space-inner">
                        <span class="margin-top">${(company == '-' || company == null) ? '' : (company == 'Gothaer') ? 'WIENER' : company}</span>
                    </div>
                    <div class="form">
                        towarzystwo ubezpieczeniowe
                    </div>
                </div>
                <div class="space">
                    <div class="space-inner">
                        <span class="margin-top">${(company == '-' || company == null) ? '' : companyAddress}</span>
                    </div>
                    <div class="form">
                        adres
                    </div>
                </div>
            </div>
        </article>
        <article class="text">
            <h3 class="center">Wypowiedzenie umowy ubezpieczenia OC</h3>
            <h5 class="center">posiadaczy pojazdów mechanicznych</h5>
            <p class="center">na podstawie <b>Ustawy z dnia 22 maja 2003 r.</b> o ubezpieczeniach obowiązkowych,
                 Ubezpieczeniowym Funduszu Gwarancyjnym i Polskim Biurze, Ubezpieczycieli Komunikacyjnych
            </p>
        </article>
        <article>
            <div>
                <p class="small-font">
                    <b>Pojazd:</b> ${(typeDetailNd == '-' || typeDetailNd == null) ? `_______________________` : typeDetailNd}${(typeDetail5Th == '-' || typeDetail5Th == null) ? `________________________` : ' '+typeDetail5Th}
                </p>
                <p class="small-font">
                    <b>Nr rejestracyjny:</b> ${(typeDetailSt == '-' || typeDetailSt == null) ? `___________________________________________` : typeDetailSt}
                </p>
                <p class="small-font">
                    <b>Nr polisy:</b> ${policyNumber || `_________________________________________________`}
                </p>
                <p class="small-font">
                    <b>Okres Ubezpieczenia:</b> od dnia: ${simplifyDate(policyDateSet)} do dnia: ${simplifyDate(policyDateEnd)}
                </p>
            </div>
        </article>
        <article class="details">
            <div class="detail-option">
                <div class="detail-option-column">
                    <div></div>
                    <b>koniec umowy</b>
                </div>
                <div class="detail-option-column small-font">
                    <p>Oświadczam, że <b><u>wypowiadam umowę ubezpieczenia OC</u></b> z ostatnim dniem okresu na jaki została zawarta. 
                        <br>Podstawa prawna: <b>art. 28 ust. 1</b> Ustawy z dnia 22 maja 2003 r.</p> 
                        <span class="smaller-font">Skutek wypowiedzenia - umowa ubezpieczenia OC posiadaczy pojazdów mechanicznych <b>będzie trwała do końca okresu, na jaki została zawarta</b>, jednakże <b>nie nastąpi</b> automatyczne wznowienie umowy na kolejne 12 miesięcy.</span>
                </div>
            </div>
            <div class="detail-option">
                <div class="detail-option-column">
                    <div></div>
                    <b>nabywcy</b>
                </div>
                <div class="detail-option-column small-font">
                    <p>Oświadczam, że jako <u><b>nabywca pojazu</b> - wypowiadam</u> z dniem ____________________________
                        <br>umowę ubezpieczenia OC zawartą przez <b>zbywce pojazdu</b>.
                        <br>Podstawa prawna: <b>art. 31 ust. 1</b> Ustawy z dnia 22 maja 2003 r.
                        <ul>
                            <li>nr polisy zbywcy: ____________________________________</li>
                            <li>data nabycia pojazdu: _________________________________</li>
                        </ul>
                        <span class="smaller-font">
                            <b>Do wypowiedzenia nabywcy należy obowiązkowo dołączyć umowę/fakturę nabycia pojazdu.</b>
                            <br>Skutek wypowiedzenia - umowa ubezpieczenia OC pojazdów mechanicznych <b>wygaśnie z dniem jej wypowiedzenia</b>.
                        </span>
                    </p>
                    
                </div>
            </div>
            <div class="detail-option">
                <div class="detail-option-column">
                    <div></div>
                    <b>podwójne OC</b>
                </div>
                <div class="detail-option-column small-font">
                    <p>Oświadczam, że <u>wypowiadam z dniem</u> _______________________ umowę ubezpieczenia OC 
                        <br><b><u><i>automatycznie wznowioną</i></u></b>, (nr polisy) ____________________________________
                        <br>ponieważ zawarłem /-am nową (<b><i>drugą</i></b>) umowę OC nr ________________________________
                        <br>w TU _______________________________ z okresem odpowiedzialności
                        <br>od dnia ________________________________ do dnia ________________________________.
                        <br>Podstawa prawna: <b>art. 28a ust. 1</b> Ustawy z dnia 22 maja 2003 r.
                        <br><span class="smaller-font">
                            Skutek wypowiedzenia - umowa ubezpieczenia OC pojazdów mechaniczncyh <b>wygaśnie z dniem jej wypowiedzenia</b>,
                            <br>a Zakład Ubezpieczeń może zażądać zapłaty składki za okres, przez który ponosił odpowiedzialność.
                        </span>
                    </p>
                </div>
            </div>
        </article>
        <article class="signature">
            <div class="form">
                czytelny podpis ubezpieczonego
            </div>
        </article>
    </section>
</body>
</html>`
    } else {
        return `
        
<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <title>PDF Template</title>
    <style>
        .pdf-box {
            max-width: 400pt;
            margin: auto;
            padding: 15pt;
            line-height: 11pt;
            font-family: 'Helvetica Neue', 'Helvetica';
        }

        .client-data {
            display: -webkit-flex;
        }
        .column {
            width: 200pt;
        }
        .column:last-child {
            display: -webkit-flex;
            justify-content: -webkit-flex-end;
        }
        .form {
            border-top: 1pt solid black;
            font-size: 6pt;
            width: 162pt;
        }

        .margin-top {
            margin-top: 10pt;
        }

        .company-data {
            padding-left: 206pt;
        }

        .text {
            margin-top: 13pt;
        }
        .center {
            text-align: center;
        }
        .small-font {
            font-size: 7pt;
        }
        .text > p {
            font-size: 7pt;
        }
        .signature {
            padding-left: 180pt;
            margin-top: 45pt;
        }
        .smaller-font {
            font-size: 5pt;
        }
        .detail-option {
            display: -webkit-flex;
            margin-top: 7pt;
        }
        .detail-option-column:nth-child(1) {
            width: 40pt;
            text-align: center;
            font-size: 4pt;
            padding-top: 15pt;
        }
        .detail-option-column:nth-child(1) > div {
            width: 15pt;
            height: 15pt;
            border-radius: 3pt;
            border: 1pt solid rgb(36, 36, 36);
            background-color: rgba(128, 128, 128, 0.4);
            margin: auto;
        }
        .detail-option-column:nth-child(2) {
            padding-left: 5pt;
            width: 360pt;
        }
        ul {
            margin-top: -5pt;
            margin-left: -15pt;
            list-style-type: '- ';
        }
        .space {
            height: 20pt;
        } 
        .space-inner {
            min-height: 10pt;
            font-size: 8pt;
        }

        .date-font {
            font-size: 8pt;
        }
        
        .line-height {
            line-height: 1.2;
        }
        
        .margin-left {
            margin-left: 155pt;
        }

        .margin-left-span {
            margin-left: 51.2pt;
        }
        
        .inline-box {
            background-color: rgba(0, 128, 0, 0.5);
            border: 1px solid black;
            color: rgba(0, 128, 0, 0);
        }

        .blue {
            color: blue;
        }

        table, td, tr {
            margin: -7pt 0pt 0pt -1.6pt;
            padding: 0pt;
        }

        .medium-font {
            font-size: 8pt;
        }

        .header-font {
            font-size: 14px;
        }

    </style>
</head>

<body>
    <section class="pdf-box">
        <arcticle class="client-data">
            <div class="column">
                <div class="space">
                    <div class="space-inner">
                        <span class="margin-top">${`${name} ${surname}`}</span>
                    </div>
                    <div class="form">
                        imie i nazwisko ubezpieczonego
                    </div>
                </div>
                <div class="space">
                    <div class="space-inner">
                        <span class="margin-top">${(address == '-' || address == null) ? '' : address}</span>
                    </div>
                    <div class="form">
                        adres
                    </div>
                </div>
            </div>
            <div class="column">
                <div>
                    <span class="margin-top date-font">Biszcza, dnia ____________________________</span>
                </div>
            </div>
        </arcticle>
        <article class="company-data">
            <div>
                <div class="space">
                    <div class="space-inner">
                        <span class="margin-top">${(company == '-' || company == null) ? '' : (company == 'Gothaer') ? 'WIENER' : company}</span>
                    </div>
                    <div class="form">
                        towarzystwo ubezpieczeniowe
                    </div>
                </div>
                <div class="space">
                    <div class="space-inner">
                        <span class="margin-top">${(company == '-' || company == null) ? '' : companyAddress}</span>
                    </div>
                    <div class="form">
                        adres
                    </div>
                </div>
            </div>
        </article>
        <article class="text">
            <p class="center line-height"><span class=" header-font">Wypowiedzenie umowy ubezpieczenia OC rolników <br>oraz/lub budynków wchodzących w skład gospodarstwa rolnego</span></p>
            <p class="center">na podstawie <b>Ustawy z dnia 22 maja 2003 r.</b> o ubezpieczeniach obowiązkowych,
                 Ubezpieczeniowym Funduszu Gwarancyjnym i Polskim Biurze, Ubezpieczycieli Komunikacyjnych
            </p>
        </article>
        <article>
            <div>
                <table class="margin-top">
                    <td>
                        <tr>
                            <td class="medium-font">Adres gospodarstwa rolnego:</td><td>${(address == '-' || address == null) ? '....................................................................' : address}</td>
                        </tr>
                        <tr>
                            <td></td><td>....................................................................</td>
                        </tr>
                    </td>
                </table>
            </div>
        </article>
        <article class="details">
            <div class="detail-option">
                <div class="small-font">
                    <p>Oświadczam, że <b>wypowiadam umowę ubezpieczenia OC rolnika/budynków w gospodarstwie rolnym</b> <br />z ostatnim dniem okresu na jaki została zawarta. 
                    <br />Nr polisy: ............................................ z ważnością: od dnia ............................ do dnia .................................
                    <table>
                        <tr>
                            <td>Podstawa prawna:</td>
                            <td><span class="inline-box">aaaa</span><b><span class="blue"> art. 46 ust. 1</span></b> Ustawy (wypowiedzenie OC rolnika <b>z końcem okresu ubezpieczenia</b>)</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><span class="inline-box">aaaa</span><b><span class="blue"> art. 46 ust. 1</span></b> Ustawy (wypowiedzenie budynków rolniczych <b>z końcem okresu ubezp.</b>)</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="detail-option">
                <div class="small-font">
                    <p>Oświadczam, że <b>jako nabywca gospodarstwa rolnego - wypowiadam</b> z dniem .....................................
                        <br /><b>umowę ubezpieczenia OC</b> zawartą przez zbywcę gospodarstwa. Data nabycia: ..........................................
                        <br />Nr polisy: ............................................ z ważnością: od dnia
                        ............................ do dnia .................................
                    <table>
                        <tr>
                            <td>Podstawa prawna:</td>
                            <td><span class="inline-box">aaaa</span><b><span class="blue"> art. 46 ust. 1</span></b> Ustawy
                                (wypowiedzenie OC rolnika <b>z przez nabywcę gospodarstwa</b>)</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><span class="inline-box">aaaa</span><b><span class="blue"> art. 46 ust. 1</span></b> Ustawy
                                (wypowiedzenie budynków rolniczych <b>przez nabywcę gospod.</b>)</td>
                        </tr>
                    </table>
                    <span class="smaller-font"><b><i>Do wypowiedzenia nabywcy należy obowiązkowo dołączyć dokument nabycia gospodarstwa rolnego</i></b></span>
                </div>
            </div>
            <div class="detail-option">
                <div class="small-font">
                    <p>Oświadczam, że <b>wypowiadam</b> z dniem ....................................... <b>umowę ubezpieczenia OC rolnika/
                        <br />budynków w gospodarstwie rolnym (AUTOMATYCZNIE WZNOWIONĄ)</b>, ponieważ zawarłem/am nową <b>drugą
                        <br />umowę</b> nr .......................................................... w TU
                        ......................................................................................................
                        <br />z okresem odpowiedzialności od dnia ................................................ do dnia ................................................
                    <table>
                        <tr>
                            <td>Podstawa prawna:</td>
                            <td><span class="inline-box">aaaa</span><b><span class="blue"> art. 46 ust. 1</span></b> Ustawy
                                (wypowiedzenie OC rolnika <b>z tytułu posiadania dwóch umów</b>)</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><span class="inline-box">aaaa</span><b><span class="blue"> art. 46 ust. 1</span></b> Ustawy
                                (wypowiedzenie budynków rolniczych <b>z tyt. pos. dwóch umów</b>)</td>
                        </tr>
                    </table>
                </div>
            </div>
        </article>
        <article class="signature">
            <div class="form">
                czytelny podpis ubezpieczonego
            </div>
        </article>
    </section>
</body>

</html>`
    }


}