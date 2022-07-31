import postPic1 from "../img/postpic1.jpg";
import postPic2 from "../img/postpic2.jpg";
import postPic3 from "../img/postpic3.png";

let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0");
let yyyy = today.getFullYear();

today = dd + "/" + mm + "/" + yyyy;

export const PostsData = [
  {
    img: postPic1,
    name: "meigaheratita",
    desc: "from St. Petersburg...",
    likes: 2300,
    liked: true,
    date: today,
  },
  {
    img: postPic2,
    name: "amirkhan",
    desc: "Such a wonderful day",
    likes: 1200,
    liked: false,
    date: today,
  },
  {
    img: postPic3,
    name: "michaelscott",
    desc: "let's go ballin' 🏀",
    likes: 200,
    liked: false,
    date: today,
  },
];
