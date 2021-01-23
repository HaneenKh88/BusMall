'Strict'

var AllItemsImages = [];
var clicksArr = []; // add number of clicks to the chart
var shownArr = [];  // add number of shown to the chart
var productsName = [];  // add name of images to the chart
var FirstImage = document.getElementById('First');
var SecondImage = document.getElementById('Second');
var ThirdImage = document.getElementById('Third');
var ItemsImagesDiv = document.getElementById('ItemsImagesDiv');

var DefaultRoundsNumber = 25;
var TotalClicks = 0;

var FirstImageIndex ;
var SecondImageIndex ;
var ThirdImageIndex ;
var FirstImageIndexPrevious = -1;
var SecondImageIndexPrevious = -1;
var ThirdImageIndexPrevious = -1;


function ItemImages(name,source){
    this.name = name;
    this.source = source;
    this.ImagesClicks = 0;
    this.ImagesShown = 0;
    productsName.push(name);
    AllItemsImages.push(this);
  }

  
  
 
 
  RoundsNumberForm.addEventListener('submit', AddRoundNum);

//this function to let the user enter the number of rounds
  function AddRoundNum(event)
  {
      event.preventDefault();
     
     DefaultRoundsNumber = parseInt(event.target.RoundsNum.value) -1 ;
     return  DefaultRoundsNumber;
     
  }

  

new ItemImages('bag', 'Images/bag.jpg');
new ItemImages('banana', 'Images/banana.jpg');
new ItemImages('bathroom', 'Images/bathroom.jpg');
new ItemImages('boots', 'Images/boots.jpg');
new ItemImages('breakfast', 'Images/breakfast.jpg');
new ItemImages('bubblegum', 'Images/bubblegum.jpg');
new ItemImages('chair', 'Images/chair.jpg');
new ItemImages('cthulhu', 'Images/cthulhu.jpg');
new ItemImages('dog-duck', 'Images/dog-duck.jpg');
new ItemImages('pen', 'Images/pen.jpg');
new ItemImages('pet-sweep', 'Images/pet-sweep.jpg');
new ItemImages('scissors', 'Images/scissors.jpg');
new ItemImages('shark', 'Images/shark.jpg');
new ItemImages('sweep', 'Images/sweep.png');
new ItemImages('tauntaun', 'Images/tauntaun.jpg');
new ItemImages('unicorn', 'Images/unicorn.jpg');
new ItemImages('usb', 'Images/usb.gif');
new ItemImages('water-can', 'Images/water-can.jpg');
new ItemImages('wine-glass', 'Images/wine-glass.jpg');

console.log(AllItemsImages);


renderThreeRandomImages();
GetData();

FirstImage.addEventListener('click',handleUserClick);
SecondImage.addEventListener('click',handleUserClick);
ThirdImage.addEventListener('click',handleUserClick);

// to add a random image index

function generateRandomIndex(){
    return Math.floor(Math.random() * (AllItemsImages.length));

  }

// to genrate 3 unique images
function renderThreeRandomImages()
{
    var NonAllowed = [FirstImageIndexPrevious, SecondImageIndexPrevious, ThirdImageIndexPrevious];

    do{
    FirstImageIndex = generateRandomIndex();
    }
    while(NonAllowed.includes(FirstImageIndex));

    FirstImageIndexPrevious = FirstImageIndex;
    NonAllowed.push(FirstImageIndex);

    do{
    SecondImageIndex = generateRandomIndex();
    }
    while(NonAllowed.includes(SecondImageIndex))
    
    SecondImageIndexPrevious = SecondImageIndex;
    NonAllowed.push(SecondImageIndex);

    do{
    ThirdImageIndex = generateRandomIndex();
    } 
    while(NonAllowed.includes(ThirdImageIndex))
    ThirdImageIndexPrevious = ThirdImageIndex;

    
        AllItemsImages[FirstImageIndex].ImagesShown++;
        FirstImage.src = AllItemsImages[FirstImageIndex].source;
        AllItemsImages[SecondImageIndex].ImagesShown++;
        SecondImage.src = AllItemsImages[SecondImageIndex].source;
        AllItemsImages[ThirdImageIndex].ImagesShown++;
        ThirdImage.src = AllItemsImages[ThirdImageIndex].source;


   
    
    
    
    
}


// add the number of cliks to the total

function handleUserClick(event)
{
    

    if(TotalClicks <= DefaultRoundsNumber)
    {
        if(event.target.id === 'First'){
            AllItemsImages[FirstImageIndex].ImagesClicks++;
            TotalClicks++;
          }
        else if(event.target.id === 'Second'){
            AllItemsImages[FirstImageIndex].ImagesClicks++;
            TotalClicks++;
        }
        else if(event.target.id === 'Third'){
                AllItemsImages[FirstImageIndex].ImagesClicks++;
                TotalClicks++;
        }

        
        renderThreeRandomImages();
        
    }

    else
    {
        ItemsImagesDiv.removeEventListener('click' ,handleUserClick );
        ResultButton.disabled = false;
        
    }

    StoreData();
}

// kto store the data in local storge

function StoreData()
{
    var Order = JSON.stringify(AllItemsImages);
    localStorage.setItem('Rounds',Order);
}

// get the update stored data in local storge
function GetData()
{
    var ItemStr = localStorage.getItem('Rounds');
    ProductList = JSON.parse(ItemStr);

    if (ProductList !== null)
    {
        AllItemsImages = ProductList;
        
    }
   
    
    
}

/*function GetData()
{
    var ItemStr = localStorage.getItem('Rounds');
    ProductList = JSON.parse(ItemStr);

    if (ProductList !== null)
    {
        AllItemsImages = ProductList;
        
    }
   
    renderThreeRandomImages();
}*/


  var ResultButton = document.getElementById('SubmitResult');
  ResultButton.addEventListener('click', GoalResult);


// give the final result to the user
function GoalResult()
{
   
    var ResultItemsList = document.getElementById('ResultItemsList');
    var goalResult;
    
    
   
    for (var i = 0; i < AllItemsImages.length; i++) {
        
        goalResult = document.createElement('li');
        goalResult.textContent =  AllItemsImages[i].name + ' had '+  AllItemsImages[i].ImagesClicks + ' votes, and was seen ' + AllItemsImages[i].ImagesShown ;
        ResultItemsList.appendChild(goalResult);
    }

      
   

    FirstImage.removeEventListener('click',handleUserClick);
    SecondImage.removeEventListener('click',handleUserClick);
    ThirdImage.removeEventListener('click',handleUserClick);

    ResultButton.disabled = true;


    shownArr = [];
    clicksArr = [];
   
    for (var i = 0; i < AllItemsImages.length; i++) {
      shownArr.push(AllItemsImages[i].ImagesShown);
      clicksArr.push(AllItemsImages[i].ImagesClicks);
    }
  
      var ctx = document.getElementById('BusMallChart').getContext('2d');
      var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'bar',
      
      // The data for our dataset
      data: {
          labels: productsName,
          datasets: [
              {
              label: 'Clicked',
              backgroundColor: 'EF5FCA',
              borderColor: 'FFFFFF',
              data: clicksArr
          },
  
          {
              label: 'Shown',
              backgroundColor: 'rgb(142, 0, 91)',
              borderColor: 'FFFFFF',
              data: shownArr
          },
      ],
      },
  
      // Configuration options go here
      options: {
        scales: {
            yAxes: [{
                ticks: {
                    
                    min: 0,
                    beginAtZero: 0,
                    stepSize: 1,
                }
            }],

        }
      }
  });
 
  
}


 








