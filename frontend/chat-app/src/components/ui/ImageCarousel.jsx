import React, { useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Button from "./Button";


const Carousel = ({ images = [], product }) => {

  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);



  if (!images.length) return null;



  const nextSlide = () => {

    setCurrentIndex((prev)=>
      prev === images.length - 1 ? 0 : prev + 1
    );

  };



  const prevSlide = () => {

    setCurrentIndex((prev)=>
      prev === 0 ? images.length - 1 : prev - 1
    );

  };



  const handleMouseEnter = () => {

    if(images.length > 1){

      setCurrentIndex(1);

    }

  };



  const handleMouseLeave = () => {

    setCurrentIndex(0);

  };





return (

<div

className="
relative
w-full
mx-auto
group
cursor-pointer
"

onMouseEnter={handleMouseEnter}

onMouseLeave={handleMouseLeave}

>


{/* IMAGE CONTAINER */}

<div
className="
relative
overflow-hidden
aspect-[4/5]
rounded-sm
"
>



{
images.map((img,index)=>(


<img

key={index}

src={img}

alt={`product-${index}`}


className={`

absolute
inset-0
w-full
h-full
object-cover

transition-all
duration-700
ease-in-out

group-hover:scale-105


${
index === currentIndex

?

"opacity-100"

:

"opacity-0"

}

`}

/>


))
}




{/* OVERLAY */}

<div

className="
absolute
inset-0

bg-black/0

group-hover:bg-black/10

dark:group-hover:bg-black/30

transition-all
duration-500
"

/>







{/* QUICK ADD */}


<Button
  label="Quick Add"
  variant="secondary"
  onClick={() => navigate(`/description/${product._id}`)}
  className="
    absolute
    bottom-0
    left-1/2
    -translate-x-1/2
    w-full

    opacity-100
    translate-y-0

    sm:opacity-0
    sm:translate-y-6

    sm:group-hover:opacity-100
    sm:group-hover:translate-y-0

    transition-all
    duration-500
  "
/>







{/* LEFT ARROW */}


<button

onClick={(e)=>{

e.stopPropagation();

prevSlide();

}}


className="

absolute
left-4
top-1/2

-translate-y-1/2


w-10
h-10


rounded-full


bg-white/90

dark:bg-gray-900/90


text-gray-900

dark:text-white



flex
items-center
justify-center


shadow-md

dark:shadow-black/40


opacity-0

group-hover:opacity-100


transition-all
duration-300


hover:scale-110


"

>


<FaArrowLeftLong size={14}/>


</button>








{/* RIGHT ARROW */}



<button

onClick={(e)=>{

e.stopPropagation();

nextSlide();

}}



className="

absolute
right-4
top-1/2

-translate-y-1/2


w-10
h-10


rounded-full


bg-white/90

dark:bg-gray-900/90


text-gray-900

dark:text-white



flex
items-center
justify-center


shadow-md

dark:shadow-black/40


opacity-0

group-hover:opacity-100


transition-all
duration-300


hover:scale-110


"

>


<FaArrowRightLong size={14}/>


</button>




</div>


</div>

);

};


export default Carousel;