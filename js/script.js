"use strict";

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log("Link was clicked");

  /* [DONE] remove class 'active' from all articles link */
  const activeLinks = document.querySelectorAll(".titles a.active");
  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }

  /* [DONE] add class 'active' to the clicked link */
  console.log("clicked element", clickedElement);
  clickedElement.classList.add("active");

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll("article.active");
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const activeSelector = clickedElement.getAttribute("href");
  console.log(activeSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const findArticle = document.querySelector("article" + activeSelector);
  console.log(findArticle);

  /* [DONE] add class 'active' to the correct article */
  findArticle.classList.add("active");
};

const links = document.querySelectorAll(".titles a");

for (let link of links) {
  link.addEventListener("click", titleClickHandler);
}
