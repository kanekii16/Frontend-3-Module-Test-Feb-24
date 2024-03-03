

fetch(" https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false").then(res=>{
    return res.json();
}).then(data=>{
    renderTable(data);
})

// 
const box = document.getElementById("box");
const table = document.getElementById("myTable");

function renderTable(data){

    
    const arr = ["image","name","symbol","current_price","price_change_percentage_24h","total_volume","market_cap"];

    
   
    for(idx in data){

        const row = document.createElement("tr");
        const obj = data[idx];

        for(let i = 0 ; i < arr.length;i++){
            const td = document.createElement("td");
            td.classList.add('td-dimensions');
            if(arr[i] == "image"){
                const img = document.createElement("img");
                img.src = obj[arr[i]];
                img.width = 25;
                td.classList.add('td-dim')
                td.appendChild(img);
            }else{
                const feild = obj[arr[i]];

                if(arr[i] == "current_price" || arr[i] == "total_volume"){
                    td.innerText = "$ "+feild;
                }
                else if(arr[i] == "market_cap"){
                    td.innerText = `Mkt Cap : ${feild}`;
                }else if(arr[i]=="price_change_percentage_24h"){
                       const  res = feild.toFixed(2);
                        if(feild > 0){
                            td.classList.add('green');
                        }else{
                            td.classList.add('red');
                        }
                        td.innerText = res+"%";
                }
                else{
                    td.innerText = feild;
                }
                
            }
            
            row.appendChild(td);
        }
        table.appendChild(row);
    }

    box.appendChild(table);


}



const input = document.querySelector(".search");

input.addEventListener("keyup",searchElement);

// Search Button Functionality ! ;

function searchElement(e){
    
    let filter = e.target.value.toUpperCase();
   
    let tr = table.getElementsByTagName('tr');
    
    for(let i = 0 ; i < tr.length ; i++){
        let searchName = tr[i].getElementsByTagName('td')[1];
        let serachSymbol = tr[i].getElementsByTagName('td')[2];
        
        if(searchName || serachSymbol){

            let optionOne = searchName.textContent || searchName.innerHTML ;
            let optionTwo = serachSymbol.textContent || serachSymbol.innerHTML;

            if(optionOne.toUpperCase().indexOf(filter) > -1 || optionTwo.toUpperCase().indexOf(filter) > -1 ){
                tr[i].style.display = 0;
            }else{
                tr[i].style.display = "none";
            }

        }
    }
    

}





