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
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author';

  function generateTitleLinks(customSelector = '') {
    /* [DONE] clear content in all links*/
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* [DONE] for each article */
    const articles = document.querySelectorAll(
      optArticleSelector + customSelector
    );

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
  }

  generateTitleLinks();

  function generateTags() {
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* [DONE] START LOOP: for every article: */

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
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        console.log(linkHTML);

        /* [DONE] add generated code to html variable */
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

  function tagClickHandler(event) {
    /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('Link was clicked');

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);

    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log(tag);

    /* [DONE] find all tag links with class active */
    const findTags = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log(findTags);

    /* [DONE START LOOP: for each active tag link */
    /* [DONE] remove class active */
    for (let activeTag of findTags) {
      activeTag.classList.remove('active');
    }
    /* END LOOP: for each active tag link */

    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
    const findTagsLinks = document.querySelectorAll('a[href="' + href + '"]');

    /*[DONE] START LOOP: for each found tag link */
    for (let activeTagLink of findTagsLinks) {
      /* [DONE add class active */
      activeTagLink.classList.add('active');
    }
    /* END LOOP: for each found tag link */

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags() {
    /* [DONE] find all links to tags */
    const links = document.querySelectorAll(optArticleTagsSelector + ' a');

    /* [DONE] START LOOP: for each link */
    for (let link of links) {
      /* [DONE] add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
    }

    /* END LOOP: for each link */
  }

  addClickListenersToTags();

  function generateAuthors() {
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* [DONE] START LOOP: for every article: */
    for (let article of articles) {
      /* [DONE] make html variable with empty string */
      const authorList = article.querySelector(optArticleAuthorSelector);
      authorList.innerHTML = '';

      /* [DONE] get author from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');
      console.log(articleAuthor);

      /* [DONE] generate link HTML for author */
      const linkHTML =
        '<a href="#' + articleAuthor + '">by ' + articleAuthor + '</a>';
      console.log(linkHTML);
      /* [DONE] Add link author to article */
      authorList.innerHTML = linkHTML;
    }
  }

  generateAuthors();

  function authorClickHandler(event) {
    /* [DONE] prevent default action for this event */
    event.preventDefault();
    const clickedElement = this;

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);

    /* [DONE] find all authors links with class active */
    const findAuthors = document.querySelectorAll(
      optArticleAuthorSelector + ' a.active'
    );

    /* [DONE START LOOP: for each active author link */
    for (let author of findAuthors) {
      /* [DONE] remove class active */
      author.classList.remove('active');
    }
    /* END LOOP: for each active author link */

    /* [DONE] find all author links with "href" attribute equal to the "href" constant */
    const findAuthorsLinks = document.querySelectorAll(
      'a[href="' + href + '"]'
    );

    /*[DONE] START LOOP: for each found author link */
    for (let activeAuthor of findAuthorsLinks) {
      /* [DONE add class active */
      activeAuthor.classList.add('active');
    }
    /* END LOOP: for each found author link */

    /* [DONE] make a new constant "author" and extract tag from the "href" constant */
    const author = href.replace('#', '');
    console.log(author);

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  }

  function addClickListenersToAuthors() {
    /* [DONE] find all links to authors */
    const links = document.querySelectorAll(optArticleAuthorSelector + ' a');

    /* [DONE] START LOOP: for each link */
    for (let link of links) {
      /* [DONE] add authorClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);
    }

    /* END LOOP: for each link */
  }

  addClickListenersToAuthors();
}
