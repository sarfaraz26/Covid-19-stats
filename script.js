//for whole world status
function overAllStatus()
{
    fetch('https://api.covid19api.com/world/total').then(
        function(res)
        {
            return res.json();
        }
    ).then(
        function(data)
        {
            let confirm = data.TotalConfirmed;
            let recover = data.TotalRecovered;
            let death = data.TotalDeaths; 

            let row1 = document.querySelector('.row1');
            let rate = document.createElement('h3');
            rate.innerHTML = confirm;
            row1.appendChild(rate);

            let row2 = document.querySelector('.row2');
            let rate1 = document.createElement('h3');
            rate1.innerHTML = recover;
            row2.appendChild(rate1);

            let row3 = document.querySelector('.row3');
            let rate2 = document.createElement('h3');
            rate2.innerHTML = death;
            row3.appendChild(rate2);
        }
    )
}

//for finding data counry wise
function countryWise()
{

        let btn = document.getElementById('btn');
        btn.addEventListener('click',function()
        {

            let countryInput = document.getElementById('countryinp').value;        
            url = 'https://api.covid19api.com/live/country/'+countryInput;
    
            fetch(url).then((res)=>{
                return res.json();
            }).then((data)=>{
        
                let length = data.length;
                let fullDate = data[length-1].Date;
                let onlyDate = fullDate.substring(0,10);

                let confirmCases = data[length-1].Confirmed;
                let deathCases = data[length-1].Deaths;
                let recoveredCases = data[length-1].Recovered;
                
                let disp = document.getElementById('displayy');

                //create h2
                let htwo = document.createElement('h2');
                htwo.className="text-success";

                //create strong
                let strongg = document.createElement('strong');
                let text = " till date ("+onlyDate+")";
                strongg.innerHTML = countryInput+text;
                
                //append strong in h2
                htwo.appendChild(strongg);

                //append h2 in container
                disp.appendChild(htwo);
        
                function createtags(val1,val2)
                {
                    //create h3
                    let hthree = document.createElement('h3');
                    hthree.innerHTML = val1;
                    
                    //create span
                    let spann = document.createElement('span');
                    spann.className="text-danger";
                    spann.innerHTML = val2;
                    
                    hthree.appendChild(spann);
                    disp.appendChild(hthree);
                }

                createtags("Total Confirm Cases : ",confirmCases);
                createtags("Total Recovered Cases : ",recoveredCases);
                createtags("Total Death Cases : ",deathCases);

                console.log(disp);
                

            }).catch((error)=>{
                alert ("Please enter valid Country Name");
            });
        })
}

overAllStatus();
countryWise();