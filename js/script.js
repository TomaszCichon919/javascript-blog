{ 'use strict';

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
  
    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
    }
  
    /* [DONE] add class 'active' to the clicked link */

    clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);

    
  
    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts article.active');
    console.log (activeArticles);

    for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
    }
  
    /* [DONE] get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute("href");
    console.log (articleSelector);
  
    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);
  
    /* [DONE] add class 'active' to the correct article */

    targetArticle.classList.add('active');
    console.log('clickedElement:', clickedElement);


  console.log (event);
  }
  
  
  const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

  function generateTitleLinks(){

    /* [DONE] remove contents of titleList */

   const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* [DONE] for each article */

    const articles = document.querySelectorAll(optArticleSelector);
    //console.log (articles);

    /* [DONE] get the article id */

    let html = '';
    for(let article of articles){
      const articleId = article.getAttribute("id");
      //console.log (articleId);


      /* [DONE] find the title element */  /* get the title from the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

   

      /* [DONE] create HTML of the link */

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      //console.log (linkHTML);

      /* [DONE] insert link into titleList */

      html = html + linkHTML;
    }
    titleList.innerHTML = html;
    //console.log(html);

    const links = document.querySelectorAll('.titles a');
    console.log(links);
  
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks();

  function generateTags () {

    /* [DONE] find all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    /* [DONE] START LOOP: for every article: */

    for(let article of articles){
    

      /* [DONE] find tags wrapper */

      const tagWrapper = article.querySelector(optArticleTagsSelector);
      //console.log (tagWrapper);

      /* [DONE] make html variable with empty string */

      let html = '';

      /* [DONE] get tags from data-tags attribute */

      const articleTags = article.getAttribute("data-tags");
   

      /* [DONE] split tags into array */

      const articleTagsArray = articleTags.split(' ');

      //console.log (articleTagsArray);

      /* [DONE] START LOOP: for each tag */

      for(let tag of articleTagsArray){

        //console.log(tag);

        /* [DONE] generate HTML of the link */


        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';  

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


}