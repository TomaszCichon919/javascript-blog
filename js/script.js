{
  ("use strict");

  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log("Link was clicked!");

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll(".titles a.active");

    for (let activeLink of activeLinks) {
      activeLink.classList.remove("active");
    }

    /* [DONE] add class 'active' to the clicked link */

    clickedElement.classList.add("active");
    console.log("clickedElement:", clickedElement);

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll(".posts article.active");
    console.log(activeArticles);

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove("active");
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute("href");
    console.log(articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    /* [DONE] add class 'active' to the correct article */

    targetArticle.classList.add("active");
    console.log("clickedElement:", clickedElement);

    console.log(event);
  };

  const optArticleSelector = ".post",
    optTitleSelector = ".post-title",
    optTitleListSelector = ".titles",
    optArticleTagsSelector = ".post-tags .list",
    optAuthorSelector = ".post-author",
    optTagsListSelector = ".tags.list",
    optCloudClassCount = 5,
    optCloudClassPrefix = "tag-size-",
    optAuthorListSelector = ".authors";

  function generateTitleLinks(customSelector = "") {
    /* [DONE] remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = "";

    /* [DONE] for each article */

    const articles = document.querySelectorAll(
      optArticleSelector + customSelector
    );
    console.log (articles);

    /* [DONE] get the article id */

    let html = "";
    for (let article of articles) {
      const articleId = article.getAttribute("id");
      //console.log (articleId);

      /* [DONE] find the title element */ /* get the title from the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* [DONE] create HTML of the link */

      const linkHTML =
        '<li><a href="#' +
        articleId +
        '"><span>' +
        articleTitle +
        "</span></a></li>";
      //console.log (linkHTML);

      /* [DONE] insert link into titleList */

      html = html + linkHTML;
    }
    titleList.innerHTML = html;
    //console.log(html);

    const links = document.querySelectorAll(".titles a");
    console.log(links);

    for (let link of links) {
      link.addEventListener("click", titleClickHandler);
    }
  }

  generateTitleLinks();

  function calculateTagsParams (tags) {
    const params = {max: 0, min: 9999};

    for(let tag in tags){

      console.log(tag + ' is used ' + tags[tag] + ' times');

      if(tags[tag] > params.max){
        params.max = tags[tag];
      }

      if(tags[tag] < params.min){
        params.min = tags[tag];
      }
    }
    return params;
  }

  function calculateTagClass (count, params) {

    const normalizedCount = count - params.min;

    const normalizedMax = params.max - params.min;

    const percentage = normalizedCount / normalizedMax;

    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

    return optCloudClassPrefix + classNumber;

  }
  


  function generateTags(){
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
  
    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);
  
    /* START LOOP: for every article: */

    for (let article of articles) {
  
      /* find tags wrapper */

      const tagWrapper = article.querySelector(optArticleTagsSelector);
  
      /* make html variable with empty string */

      let html = "";
  
      /* get tags from data-tags attribute */

      const articleTags = article.getAttribute("data-tags");
  
      /* split tags into array */

      const articleTagsArray = articleTags.split(" ");
  
      /* START LOOP: for each tag */

      for (let tag of articleTagsArray) {
  
        /* generate HTML of the link */

        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + "</a></li>";
  
        /* add generated code to html variable */

        html = html + linkHTML;
  
        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
        
  
      /* END LOOP: for each tag */

      }
  
      /* insert HTML of all the links into the tags wrapper */

      tagWrapper.innerHTML = html;
  
    /* END LOOP: for every article: */

    }
  
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);
  
    /* [NEW] create variable for all links HTML code */

    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams)
    let allTagsHTML = '';

/* [NEW] START LOOP: for each tag in allTags: */
for(let tag in allTags){
  /* [NEW] generate code of a link and add it to allTagsHTML */
  const tagLink = '<li><a href="#tag-'+ tag +'" class="' + calculateTagClass(allTags[tag], tagsParams) + '">'+ tag+ ' (' + allTags[tag] + ')</a></li>';
  allTagsHTML += tagLink


/* [NEW] END LOOP: for each tag in allTags: */
}
/*[NEW] add HTML from allTagsHTML to tagList */
tagList.innerHTML = allTagsHTML;

  }
  generateTags();

  function tagClickHandler(event) {
    /* prevent default action for this event */

    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;
    console.log("Tag was clicked!");

    /* make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute("href");

    //console.log(href);

    /* make a new constant "tag" and extract tag from the "href" constant */

    const tag = href.replace("#tag-", "");

    /* find all tag links with class active */

    const activeTaglinks = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log(activeTaglinks);

    /* START LOOP: for each active tag link */

    for (let activeTaglink of activeTaglinks) {
      /* remove class active */

      activeTaglink.classList.remove("active");

      /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */

    const hrefTaglinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */

    for (let hrefTaglink of hrefTaglinks) {
      /* add class active */

      hrefTaglink.classList.add("active");

      /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags() {
    /* find all links to tags */

    const tlinks = document.querySelectorAll('.list a');
    console.log(tlinks);

    /* START LOOP: for each link */

    for (let tlink of tlinks) {
      /* add tagClickHandler as event listener for that link */

      const check = tlink.addEventListener("click", tagClickHandler);
      //console.log (check);

      /* END LOOP: for each link */
    }
  }

    addClickListenersToTags();

  function generateAuthors () {

     /* [NEW] create a new variable allAuthors with an empty object */
     let allAuthors = {};

     /* [DONE] find all articles */

     const articles = document.querySelectorAll(optArticleSelector);

     /* [DONE] START LOOP: for every article: */

    for (let article of articles) {

      /* [DONE] find author wrapper */

      const authorWrapper = article.querySelector(optAuthorSelector);
      console.log (authorWrapper);

      /* [DONE] make html variable with empty string */

      let html = "";

      /* [DONE] get authors from data-author attribute */

      const articleAuthor = article.getAttribute("data-author");

      /* [DONE] generate HTML of the link */

      const linkHTML = '<a href="#'+ articleAuthor + '" class="author">by '+ articleAuthor + '</a>';

      /* [DONE] add generated code to html variable */

      html = html + linkHTML;

      /* [DONE] insert HTML of all the links into the author wrapper */

      authorWrapper.innerHTML = html;

      
        /* [NEW] check if this link is NOT already in allAuthors */
        if(!allAuthors[articleAuthor]) {
          /* [NEW] add tag to allTags object */
          allAuthors[articleAuthor] = 1;
        } else {
          allAuthors[articleAuthor]++;
        }

      /* [DONE] END LOOP: for every article: */
    }

     /* [NEW] find list of authors in right column */
     const authorList = document.querySelector(optAuthorListSelector);
  
     /* [NEW] create variable for all links HTML code */

     let allAuthorsHTML = '';
 
 /* [NEW] START LOOP: for each tag in allTags: */
 for(let articleAuthor in allAuthors){
   /* [NEW] generate code of a link and add it to allTagsHTML */
   const authorLink = '<li><a href="#"><span class="author-name">'+ articleAuthor + ' (' + allAuthors[articleAuthor] + ')</span></a></li>';
   allAuthorsHTML += authorLink
 
 
 /* [NEW] END LOOP: for each tag in allTags: */
 }
 /*[NEW] add HTML from allTagsHTML to tagList */
 authorList.innerHTML = allAuthorsHTML;
  }

  generateAuthors ();

  function authorClickHandler (event) {
    /* prevent default action for this event */

    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
 
    const clickedElement = this;

    console.log("Author was clicked!");
 
    /* make a new constant "href" and read the attribute "href" of the clicked element */
 
    const href = clickedElement.getAttribute("href");
 
    //console.log(href);

    /* make a new constant "author" and extract tag from the "href" constant */

    const author = href.replace("#", "");
    //console.log (author);
    
    /* execute function "generateTitleLinks" with author selector as argument */

    generateTitleLinks('[data-author="' + author + '"]');
  }
  

  function addClickListenersToAuthors () {

    /* [DONE] find link to author */

    const alinks = document.querySelectorAll('.author');

    //console.log(alink);

    /* START LOOP: for each link */

    for (let alink of alinks) {
      
      /* [DONE] add authorClickHandler as event listener for that link */

      alink.addEventListener("click", authorClickHandler);
      //console.log (check);

      /* END LOOP: for each link */
    }
  }

  addClickListenersToAuthors ();

}
