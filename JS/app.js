'Strict'

var AllItemsImages = [];
var FirstImage = document.getElementById('First');
var SecondImage = document.getElementById('Second');
var ThirdImage = document.getElementById('Third');
//var ItemsImagesDiv = document.getElementById('ItemsImagesDiv');

var DefaultRoundsNumber = 25;
var TotalClicks = 0;

var FirstImageIndex ;
var SecondImageIndex ;
var ThirdImageIndex ;

function ItemImages(name,source){
    this.name = name;
    this.source = source;
    this.ImagesClicks = 0;
    this.ImagesShown = 0;

    AllItemsImages.push(this);
  }

 
  RoundsNumberForm.addEventListener('submit', AddRoundNum);

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

FirstImage.addEventListener('click',handleUserClick);
SecondImage.addEventListener('click',handleUserClick);
ThirdImage.addEventListener('click',handleUserClick);

function generateRandomIndex(){
    return Math.floor(Math.random() * (AllItemsImages.length));

  }

function renderThreeRandomImages()
{
    FirstImageIndex = generateRandomIndex();
    SecondImageIndex = generateRandomIndex();
    ThirdImageIndex = generateRandomIndex();

    while (FirstImageIndex === SecondImageIndex || FirstImageIndex === ThirdImageIndex || SecondImageIndex === ThirdImageIndex)
    {
        SecondImageIndex = generateRandomIndex();
        ThirdImageIndex = generateRandomIndex();
    }

    AllItemsImages[FirstImageIndex].ImagesShown++;
    AllItemsImages[SecondImageIndex].ImagesShown++;
    AllItemsImages[ThirdImageIndex].ImagesShown++;

    FirstImage.src = AllItemsImages[FirstImageIndex].source;
    SecondImage.src = AllItemsImages[SecondImageIndex].source;
    ThirdImage.src = AllItemsImages[ThirdImageIndex].source;
    
}



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


}

  var ResultButton = document.getElementById('SubmitResult');
  ResultButton.addEventListener('click', GoalResult);

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
}






