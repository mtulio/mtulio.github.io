
var updated = [];
var allrepos = [];

// go to http://thissite.example.com/#DEBUG to set DEBUG=true
var DEBUG = (window.location.hash === '#DEBUG');

(function ($, undefined) {

  var repoUrls = {
  };

  function repoUrl(repo) {
    return repoUrls[repo.name] || repo.html_url;
  }

  function repoDescription(repo) {
    desc = repo.description;
    return desc;
  }

  function addUpdated()
  {
    $("#updated").empty();
    for (r=0; r < Math.min(4, updated.length); r++)
    {
      repo = updated[r];
      desc = repoDescription(repo);
      var $uitem = $("<div>").addClass("updated-card col-sm-5 col-md-4 col-lg-3");
      var $item = $("<div>").addClass("card pin " + (repo.language || '').toLowerCase() + " "+repo.name.toLowerCase());
      var $link = $("<a>").attr("href", repoUrl(repo)).appendTo($item);
      $link.append($("<h4>").text(repo.name));
      $link.append($("<h5>").text((repo.language != null) ? repo.language : ""));
      $item.append($("<p>").text(desc));
      $item.appendTo($uitem);
      $uitem.appendTo("#updated");
    }

    var d = $("#updated").collapse({
     toggle: true
   });

  }

  function addAllRepos()
  {
    $("#allrepos").empty();

    for (r=0; r < allrepos.length; r++)
    {
      repo = allrepos[r];
      desc = repoDescription(repo);
      var $item = $("<div>").addClass("card pin col-sm-5 col-md-4 col-lg-3 " + (repo.language || '').toLowerCase() + " "+repo.name.toLowerCase());
      var $link = $("<a>").attr("href", repoUrl(repo)).appendTo($item);
      $link.append($("<h4>").html(repo.name + "<div class='org'><a href='"+repo.owner.html_url+"'>("+repo.owner.login+")"));
      $link.append($("<h5>").text((repo.language != null) ? repo.language : ""));
      $item.append($("<p>").text(desc));
      htag = "#allrepos";
      $item.appendTo(htag);
    }

    $(".nrepos").text("("+allrepos.length+")");

    var d = $("#allrepos").collapse({
     toggle: true
   });

  }

  function pushRepo(repos, org)
  {
    var left = repos; var right = allrepos;
    var result  = [],
    il      = 0,
    ir      = 0;

    while (il < left.length && ir < right.length){
     if (left[il].name.toLowerCase() < right[ir].name.toLowerCase()){
       result.push(left[il++]);
     } else {
       result.push(right[ir++]);
     }
   }

   allrepos = result.concat(left.slice(il)).concat(right.slice(ir));
 }

 function mergeUpdated(repos)
 {
   var left = repos; var right = updated;
   var result  = [],
   il      = 0,
   ir      = 0;

   while (il < left.length && ir < right.length){
    if (left[il].pushed_at > right[ir].pushed_at){
      result.push(left[il++]);
    } else {
      result.push(right[ir++]);
    }
  }

  updated = result.concat(left.slice(il)).concat(right.slice(ir));
}

function addRepos(orgs, repos, page) {
 var forks = [];
 var org = orgs.name;
 repos = repos || [];
 page = page || 1;
 reposcmd = orgs.type === "repo" ? "" : "/repos";

 // These client tokens are for a dummy app, and there is no user specific information that we get, so
 // all in all, pretty safe to expose this here.

   // there are three supported request types: org, user and repo. Syntax differs.
   if((orgs.type !== 'org') && (orgs.type !== 'user') && (orgs.type !== 'repo')) {
      console.log('** Unknown type “'+orgs.type+'” for org “'+org+'” — check “orgs.js” for typo.');
      return;
   }
   var uri = "https://api.github.com/"+ orgs.type +"s/"+ org + reposcmd
   + "?per_page=1000"
   + "&client_id=1bafa09b6086eec7afb4"
   + "&client_secret=7e6422a0a2e24f0d0ecb7521a63990b5758c9cc8";
   $.getJSON(uri, function (result) {
     if (!Array.isArray(result)) {
       result = [].concat(result);
     }
     if (result && result.length > 0) {
      repos = repos.concat(result);

      $(function () {

        $.each(repos, function (i, repo) {
          repo.pushed_at = new Date(repo.pushed_at);
          if (repo.fork === true) {  // if this is a fork, save the index
            forks.push(i);
          }
        });

        // remove forks from the view
        $.each(forks, function(i, forkindex) {
          var indextoremove = forkindex - i; // account for prior splices
          if(DEBUG) console.log('removing forked entry: ' + repos[indextoremove].full_name);
          repos.splice(indextoremove,1);
        });

    // pre sort by how recently the repo was modified
    repos.sort(function (a, b) {
      if (a.pushed_at < b.pushed_at) return 1;
      if (b.pushed_at < a.pushed_at) return -1;
      return 0;
    });

    mergeUpdated(repos);

    repos.sort(function (a, b) {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {return 1;}
      if (b.name.toLowerCase() > a.name.toLowerCase()) {return -1};
      return 0;
    });
    pushRepo(repos, org);

    addUpdated();
    addAllRepos();

  });
    }
  });
 }

 $("<div>").addClass("separator").appendTo("#wrapper");
 var $sectiontitle = $("<div>").addClass("section-title").appendTo("#wrapper");
 var $title = $("<span>").addClass('title').text("recent").appendTo($sectiontitle);
 var $item = $("<div id='updated'>").addClass("columns section collapse");
 $item.appendTo($sectiontitle);
 var $twistie = $("<a data-toggle='collapse' data-target='#updated'>").addClass("twistie showdetails");
 $twistie.appendTo($sectiontitle);

 $("<div>").addClass("separator gap").appendTo("#wrapper");
 var $sectiontitle = $("<div>").addClass("section-title").appendTo("#wrapper");
 var $title = $("<span>").addClass('title').text("repos").appendTo($sectiontitle);
 var $repos = $("<span>").addClass('nrepos').text("(0)").appendTo($title);
 var $item = $("<div id='allrepos'>").addClass("columns section collapse");
 $item.appendTo($sectiontitle);
 var $twistie = $("<a data-toggle='collapse' data-target='#allrepos'>").addClass("twistie showdetails");
 $twistie.appendTo($sectiontitle);

 for (var r in orgs)
 {
  addRepos(orgs[r]);
}

$("<div>").addClass("separator").appendTo("#wrapper");

$("<div>").addClass("separator").appendTo("#wrapper");
var $sectiontitle = $("<div>").addClass("section-title").appendTo("#wrapper");
var $title = $("<span>").addClass('title').text("GITHUB Pages").appendTo($sectiontitle);
$twistie.appendTo($sectiontitle);

})(jQuery);

$('#search').keyup(function() {
var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
$rows = $(".card")
$rows.show().filter(function() {
  var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
  return !~text.indexOf(val);
}).hide();

// update repo count here
n = $rows.length;
for (r in $rows)
{
  row = $rows[r];
  style = row.style;
  if (style && style.cssText && style.cssText.match("none"))
  {
    n--;
  }

}

$rows = $(".updated-card");
$rows.show().filter(function() {
  var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
  return !~text.indexOf(val);
}).hide();

m = 4;
for (r in $rows)
{
  row = $rows[r];
  style = row.style;
  if (style && style.cssText && style.cssText.match("none"))
  {
    m--;
  }

}

$(".nrepos").text("("+(n - m)+")");

$('body').on('click', 'a[data-analytics-category][data-analytics-action]', function(e){

  // No analytics? Bail.
  if ( ! window.ga )
    return;

  // for links to external sources, we need a tiny delay to have a little extra time to send to Google's servers before unload
  // 200ms is about right for enough time
  if (this.hostname && this.hostname !== location.hostname) {
    // Stop the link action
    e.preventDefault();

    // setTimeout callback is called in the window scope, so cache the url from the link now
    var url = this.href;

    // in 200ms, off you go
    setTimeout(function(){
      document.location = url;
    },200);
  }

  var $el = $(this),
      data = {'hitType': 'event'}; // make a new data object

  // category (required string)
  data['eventCategory'] =  $el.attr('data-analytics-category');

  // action (required string)
  data['eventAction'] = $el.attr('data-analytics-action');

  // label (optional string)
  if ( $el.attr('data-analytics-label') )
    data['eventLabel'] = $el.attr('data-analytics-label');

  // value (optional int)
  if ( $el.attr('data-analytics-value') )
    data['eventValue'] = parseInt( $el.attr('data-analytics-value') );

  // send the data
  ga('send', data);

});
// Fix copyright to be the current year.
});
