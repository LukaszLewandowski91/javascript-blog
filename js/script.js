{
  ('use strict');

  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked');

    /* [DONE] remove class 'active' from all articles link */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    console.log('clicked element', clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('article.active');
    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const activeSelector = clickedElement.getAttribute('href');
    console.log(activeSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const findArticle = document.querySelector('article' + activeSelector);
    console.log(findArticle);

    /* [DONE] add class 'active' to the correct article */
    findArticle.classList.add('active');
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';

  const generateTitleLinks = function () {
    /* [DONE] clear content in all links*/
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* [DONE] for each article */
    const articles = document.querySelectorAll(optArticleSelector);

    let html = '';

    for (let article of articles) {
      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');
      console.log(articleId);

      /* [DONE] find the title element and get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log(articleTitle);

      /* [DONE] create HTML of the link */
      const linkHTML =
        '<li><a href="#' +
        articleId +
        '"><span>' +
        articleTitle +
        '</span></a></li>';
      console.log(linkHTML);

      html = html + linkHTML;
      console.log(html);
    }

    /* [DONE] insert link into titleList */
    titleList.innerHTML = html;

    /* read link to article */
    const links = document.querySelectorAll('.titles a');
    console.log(links);

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks();

  function generateTags() {
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* [IN PROGRESS] START LOOP: for every article: */

    for (let article of articles) {
      let html = '';
      /* [DONE] make html variable with empty string */
      const tagsList = article.querySelector(optArticleTagsSelector);
      tagsList.innerHTML = '';

      /* [DONE] get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);

      /* [DONE] split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);

      /* [DONE] START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        /* [DONE] generate HTML of the link */
        const linkHTML =
          '<li><a href="#tag-' + tag + '">' + tag + '&nbsp; </a></li>';
        console.log(linkHTML);

        /* add generated code to html variable */
        html = html + linkHTML;
        console.log(html);
      }
      /* END LOOP: for each tag */

      /* [DONE] insert HTML of all the links into the tags wrapper */
      tagsList.innerHTML = html;
      /* find tags wrapper */
    }
    /* END LOOP: for every article: */
  }

  generateTags();
}
