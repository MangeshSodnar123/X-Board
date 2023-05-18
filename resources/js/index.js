//  get data from api
const getData = async(topic)=>{
    let data = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://flipboard.com/topic/${topic}.rss`);
    let dataJson = await data.json();
    // console.log("data = ", dataJson.items);
    // debugger
    let arr = Array.from(dataJson.items);
    console.log(arr);
    return arr;
}

// add cards to corousel

const addCardsToCarousel = (items,nodeId) =>{
let carouselInnerNode = document.querySelector(`#carousel-inner-${nodeId}`);

    items.forEach((item,index)=>{
        //date manipulations

        let currentDate = new Date(item.pubDate);
        // Extract day, month, and year components
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1; // Month starts from 0
        let year = currentDate.getFullYear();
        let date = `${day}/${month}/${year}`
        console.log(date);
        
        if(index==0){

         carouselInnerNode.innerHTML += `
         <div class="carousel-item active">
             <a href=${item.link} class="text-decoration-none text-dark"> 
             <div class="card mb-3">
                <div>
                <img src=${item.enclosure.link} class="card-img-top" alt="...">
                </div>
                 <div class="card-body">
                 <h5 class="card-title">${item.title}</h5>
                 <div class="author">
                     ${item.author} <i class='fas fa-circle circle'></i> ${date
                     }
                 </div>
                 <p class="card-text">${item.description}</p>
                 </div>
             </div>
             </a>
         </div>
 ` 
     }
     else{
         carouselInnerNode.innerHTML += `
         <div class="carousel-item">
             <a href=${item.link} class="text-decoration-none text-dark"> 
             <div class="card mb-3">
             <div>
             <img src=${item.enclosure.link} class="card-img-top" alt="...">
             </div>
                 <div class="card-body">
                 <h5 class="card-title">${item.title}</h5>
                 <div class="author">
                     ${item.author} <i class='fas fa-circle circle'></i> ${date
                     }
                 </div>
                 <p class="card-text">${item.description}</p>
                 </div>
             </div>
             </a>
         </div>
 ` 
     } 

    })
} 

const main = async()=>{
    let topics = ["environment","space","sports"]
    let environmentNewsItemsArray = await getData(topics[0]);
    let spaceNewsItemsArray = await getData(topics[1]);
    let sportsNewsItemsArray = await getData(topics[2]);
    // console.log("from main",items);
    addCardsToCarousel(environmentNewsItemsArray,1);
    addCardsToCarousel(spaceNewsItemsArray,2);
    addCardsToCarousel(sportsNewsItemsArray,3);

}
main();

// let carouselInnerNode = document.querySelector("#carousel-inner-1");
// console.log(carouselInnerNode);
//  for(let i=0;i<items.length; i++){
//      // debugger
//      let item = items[i];
//      console.log(item);
//      if(i==0){

//          carouselInnerNode.innerHTML += `
//          <div class="carousel-item active">
//              <a href=${item.link} class="text-decoration-none text-dark"> 
//              <div class="card mb-3">
//                  <img src=${item.enclosure.link} class="card-img-top" alt="...">
//                  <div class="card-body">
//                  <h5 class="card-title">${item.title}</h5>
//                  <div class="author">
//                      ${item.author} <i class='fas fa-circle'></i> 12/12/12
//                  </div>
//                  <p class="card-text">${item.description}</p>
//                  </div>
//              </div>
//              </a>
//          </div>
//  ` 
//      }
//      else{
//          carouselInnerNode.innerHTML += `
//          <div class="carousel-item">
//              <a href=${item.link} class="text-decoration-none text-dark"> 
//              <div class="card mb-3">
//                  <img src=${item.enclosure.link} class="card-img-top" alt="...">
//                  <div class="card-body">
//                  <h5 class="card-title">${item.title}</h5>
//                  <div class="author">
//                      ${item.author} <i class='fas fa-circle'></i> 12/12/12
//                  </div>
//                  <p class="card-text">${item.description}</p>
//                  </div>
//              </div>
//              </a>
//          </div>
//  ` 
//      } 
// };