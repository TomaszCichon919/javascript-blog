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
    optArticleTagsSelector = ".post-tags .list";

  function generateTitleLinks(customSelector = "") {
    /* [DONE] remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = "";

    /* [DONE] for each article */

    const articles = document.querySelectorAll(
      optArticleSelector + customSelector
    );
    //console.log (articles);

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

  function generateTags() {
    /* [DONE] find all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    /* [DONE] START LOOP: for every article: */

    for (let article of articles) {
      /* [DONE] find tags wrapper */

      const tagWrapper = article.querySelector(optArticleTagsSelector);
      //console.log (tagWrapper);

      /* [DONE] make html variable with empty string */

      let html = "";

      /* [DONE] get tags from data-tags attribute */

      const articleTags = article.getAttribute("data-tags");

      /* [DONE] split tags into array */

      const articleTagsArray = articleTags.split(" ");

      //console.log (articleTagsArray);

      /* [DONE] START LOOP: for each tag */

      for (let tag of articleTagsArray) {
        //console.log(tag);

        /* [DONE] generate HTML of the link */

        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + "</a></li>";

        /* [DONE] add generated code to html variable */

        html = html + linkHTML;

        /* [DONE] END LOOP: for each tag */
      }

      /* [DONE] insert HTML of all the links into the tags wrapper */

      tagWrapper.innerHTML = html;

      /* [DONE] END LOOP: for every article: */
    }
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

    console.log(href);

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

    const tlinks = document.querySelectorAll('.list-horizontal li a');
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
  
}
