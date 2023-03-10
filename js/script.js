{
  ('use strict');

  const select = {
    all: {
      articles: '.post',
      linksTo: {
        tags: 'a.active[href^="#tag-"]',
      },
    },
    article: {
      title: '.post-title',
      tags: '.post-tags .list',
      author: '.post-author',
    },
    listOf: {
      titles: '.titles',
      tags: '.tags.list',
      authors: '.authors.list',
    },
  };

  const opts = {
    tagSizes: {
      count: 5,
      classPrefix: 'tag-size-',
    },
  };

  const templates = {
    articleLink: Handlebars.compile(
      document.querySelector('#template-article-link').innerHTML
    ),
    tagLink: Handlebars.compile(
      document.querySelector('#template-tag-link').innerHTML
    ),
    authorLink: Handlebars.compile(
      document.querySelector('#template-author-link').innerHTML
    ),
    tagCloudLink: Handlebars.compile(
      document.querySelector('#template-tag-cloud-link').innerHTML
    ),
    authorCloudLink: Handlebars.compile(
      document.querySelector('#template-author-cloud-link').innerHTML
    ),
  };

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

  const generateTitleLinks = function (customSelector = '') {
    /* [DONE] clear content in all links*/
    const titleList = document.querySelector(select.listOf.titles);
    titleList.innerHTML = '';

    /* [DONE] for each article */
    const articles = document.querySelectorAll(
      select.all.articles + customSelector
    );

    let html = '';

    for (let article of articles) {
      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');
      console.log(articleId);

      /* [DONE] find the title element and get the title from the title element */
      const articleTitle = article.querySelector(
        select.article.title
      ).innerHTML;
      console.log(articleTitle);

      /* [DONE] create HTML of the link */
      const linkHTMLData = { id: articleId, title: articleTitle };
      const linkHTML = templates.articleLink(linkHTMLData);
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

  const calculateTagsParams = function (tags) {
    const params = { min: 9999999, max: 0 };
    for (let tag in tags) {
      if (tags[tag] > params.max) {
        params.max = tags[tag];
      }
      if (tags[tag] < params.min) {
        params.min = tags[tag];
      }
    }
    return params;
  };

  const calculateTagClass = function (count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (opts.tagSizes.count - 1) + 1);
    const className = opts.tagSizes.classPrefix + classNumber;
    return className;
  };

  const generateTags = function () {
    /* [DONE] create a new variable allTags with an empty object */
    let allTags = {};
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(select.all.articles);

    /* [DONE] START LOOP: for every article: */

    for (let article of articles) {
      let html = '';
      /* [DONE] make html variable with empty string */
      const tagsList = article.querySelector(select.article.tags);
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
        const linkHTMLData = { id: tag, title: tag };
        const linkHTML = templates.tagLink(linkHTMLData);
        console.log(linkHTML);

        /* [DONE] add generated code to html variable */
        html = html + linkHTML;
        console.log(html);

        /* [DONE] check if this link is NOT already in allTags */
        if (!allTags[tag]) {
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      }
      /* END LOOP: for each tag */

      /* [DONE] insert HTML of all the links into the tags wrapper */
      tagsList.innerHTML = html;
      /* find tags wrapper */
    }
    /* END LOOP: for every article: */

    /* [DONE] find list of tags in right column */
    const tagList = document.querySelector(select.listOf.tags);

    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);

    /* [DONE] create variable for all links HTML code */
    const allTagsData = { tags: [] };

    /* [DONE] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      /* [DONE] generate code of a link and add it to allTagsHTML */
      const tagLinkHTML =
        '<li><a class="' +
        calculateTagClass(allTags[tag], tagsParams) +
        '" href="#tag-' +
        tag +
        '">' +
        tag +
        '</a> </li>';
      console.log(tagLinkHTML);

      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams),
      });
    }
    /* END LOOP: for each tag in allTags: */

    /*[DONE] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log('New list of tags: ' + allTagsData);
  };

  generateTags();

  const tagClickHandler = function (event) {
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
    const findTags = document.querySelectorAll(select.all.linksTo.tags);
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
    for (let tagLink of findTagsLinks) {
      /* [DONE add class active */
      tagLink.classList.add('active');
    }
    /* END LOOP: for each found tag link */

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  };

  const addClickListenersToTags = function () {
    /* [DONE] find all links to tags */
    const links = document.querySelectorAll(select.article.tags + ' a');

    /* [DONE] START LOOP: for each link */
    for (let link of links) {
      /* [DONE] add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
    }

    /* END LOOP: for each link */
  };

  addClickListenersToTags();

  const addClickListenersToListTags = function () {
    /* [DONE] find all links to tags */
    const links = document.querySelectorAll(select.listOf.tags + ' a');

    /* [DONE] START LOOP: for each link */
    for (let link of links) {
      /* [DONE] add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
    }

    /* END LOOP: for each link */
  };

  addClickListenersToListTags();

  const generateAuthors = function () {
    /* [DONE] create a new variable allAuthors with an empty object */
    let allAuthors = {};

    /* [DONE] find all articles */
    const articles = document.querySelectorAll(select.all.articles);

    /* [DONE] START LOOP: for every article: */
    for (let article of articles) {
      /* [DONE] make html variable with empty string */
      const authorList = article.querySelector(select.article.author);
      authorList.innerHTML = '';

      /* [DONE] get author from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');
      console.log(articleAuthor);

      /* [DONE] check if this link is NOT already in allAuthors */
      if (!allAuthors[articleAuthor]) {
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }
      console.log(allAuthors);

      /* [DONE] generate link HTML for author */
      const linkHTMLData = { id: articleAuthor, title: articleAuthor };
      const linkHTML = templates.authorLink(linkHTMLData);

      console.log(linkHTML);

      /* [DONE] Add link author to article */
      authorList.innerHTML = linkHTML;

      /* [DONE] find list of authors in right column */

      const authorsList = document.querySelector(select.listOf.authors);
      /* [DONE] create variable for all links HTML code */
      const allAuthorsData = { authors: [] };

      /* [DONE] START LOOP: for each tag in allAuthors: */
      for (let author in allAuthors) {
        /* [DONE] generate code of a link and add it to allAuthorsHTML */
        const authorLinkHTML =
          '<li><a href="#' +
          author +
          '">' +
          author +
          '</a> (' +
          allAuthors[author] +
          ')</li>';
        console.log(authorLinkHTML);

        allAuthorsData.authors.push({
          author: author,
          count: allAuthors[author],
        });
      }
      /* END LOOP: for each tag in allAuthors: */
      authorsList.innerHTML = templates.authorCloudLink(allAuthorsData);
    }
  };

  generateAuthors();

  const authorClickHandler = function (event) {
    /* [DONE] prevent default action for this event */
    event.preventDefault();
    const clickedElement = this;

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);

    /* [DONE] find all authors links with class active */
    const findAuthors = document.querySelectorAll(
      select.listOf.authors + ' a.active'
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
    for (let authorLink of findAuthorsLinks) {
      /* [DONE add class active */
      authorLink.classList.add('active');
    }
    /* END LOOP: for each found author link */

    /* [DONE] make a new constant "author" and extract tag from the "href" constant */
    const author = href.replace('#', '');
    console.log(author);

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  };

  const addClickListenersToAuthors = function () {
    /* [DONE] find all links to authors */
    const links = document.querySelectorAll(select.article.author + ' a');

    /* [DONE] START LOOP: for each link */
    for (let link of links) {
      /* [DONE] add authorClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);
    }

    /* END LOOP: for each link */
  };

  addClickListenersToAuthors();

  const addClickListenersToListAuthors = function () {
    /* [DONE] find all links to authors */
    const links = document.querySelectorAll(select.listOf.authors + ' a');

    /* [DONE] START LOOP: for each link */
    for (let link of links) {
      /* [DONE] add authorClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);
    }

    /* END LOOP: for each link */
  };

  addClickListenersToListAuthors();
}
