(this.webpackJsonpgitpop3=this.webpackJsonpgitpop3||[]).push([[0],{145:function(t,e,n){},146:function(t,e,n){},165:function(t,e,n){"use strict";n.r(e);var r=n(4),c=n(1),o=n.n(c),a=n(34),i=n.n(a),s=(n(145),n(146),n(147),n(72)),j=n(133),u=n(134),l=n(31),d=n(178),b=n(183),h=n(174),O=n(122),m=n(175),f=n(32),x=/https?:\/\/github.com\/([\w-_.]+)\/([\w-_.]+)/,g=function(t){return t&&t.match(x)||null},p=function(t){var e=t.loading;return Object(r.jsx)(f.a,{icon:e?"spinner":"search",spin:e})},C=function(t){var e=t.onSubmit,n=t.loading,o=Object(c.useState)(),a=Object(l.a)(o,2),i=a[0],s=a[1],j=function(t){t.preventDefault(),null===g(i)?t.stopPropagation():e(i)},u=i&&null===g(i);return Object(r.jsx)(b.a,{onSubmit:j,children:Object(r.jsxs)(h.a,{className:"mb-3",children:[Object(r.jsx)(O.a,{placeholder:"https://github.com/django/django",onChange:function(t){return s(t.target.value)},isInvalid:u}),Object(r.jsx)(h.a.Append,{children:Object(r.jsx)(m.a,{type:"submit",variant:"outline-secondary",onClick:j,children:Object(r.jsx)(p,{loading:n})})})]})})},k=n(123),v=n(180),y=n(176),w=n(177),S=n(124),B=n.n(S),P=function(t){var e=Math.floor((Date.now()-t.getTime())/1e3),n=e/31536e3;return n>1?"".concat(Math.floor(n)," years ago"):(n=e/2592e3)>1?"".concat(Math.floor(n)," months ago"):(n=e/86400)>1?"".concat(Math.floor(n)," days ago"):(n=e/3600)>1?"".concat(Math.floor(n)," hours ago"):(n=e/60)>1?"".concat(Math.floor(n)," minutes ago"):"".concat(Math.floor(e)," seconds ago")},D=function(t){var e=t.nameWithOwner;return Object(r.jsx)("a",{href:"https://github.com/".concat(e),children:e})},M=function(t){var e=t.info;return Object(r.jsxs)("tr",{children:[Object(r.jsx)("td",{children:Object(r.jsx)(D,{nameWithOwner:e.nameWithOwner})}),Object(r.jsx)("td",{children:e.stargazerCount}),Object(r.jsx)("td",{children:e.forkCount}),Object(r.jsx)("td",{children:e.object.history.totalCount}),Object(r.jsx)("td",{children:P(new Date(e.object.committedDate))})]})},R=function(t,e,n){return t.slice((e-1)*n,e*n)},z=function(t){var e,n=t.column,c=t.orderBy;return Object(r.jsx)(f.a,{icon:c.column===n?(e=c.direction,"asc"===e?"sort-down":"sort-up"):"sort"})},A=function(t){var e=t.onHeaderClick,n=t.sortByCommittedDate,c=t.orderBy;return Object(r.jsx)(v.a,{transition:!1,overlay:Object(r.jsx)(y.a,{children:"Last commit on master."}),children:Object(r.jsxs)("th",{onClick:function(){return e("committedDate",n)},children:[Object(r.jsx)(f.a,{icon:"calendar-alt"})," Modified"," ",Object(r.jsx)(z,{column:"committedDate",orderBy:c})]})})},N=function(t){var e=t.forks,n=t.activePage,o=t.itemsCountPerPage,a=t.onPageChange,i=function(t){return function(e,n){return Object(k.orderBy)(e,[t],[n])}},s=i((function(t){return t.nameWithOwner.toLowerCase()})),j=i((function(t){return t.stargazerCount})),u=i((function(t){return t.forkCount})),d=i((function(t){return t.object.history.totalCount})),b=i((function(t){return Date.parse(t.object.committedDate)})),h=Object(c.useState)({column:"stargazerCount",direction:"desc",sortFunc:j}),O=Object(l.a)(h,2),m=O[0],x=O[1],g=function(t,e){var n="desc"===m.direction?"asc":"desc",r=t===m.column?n:m.direction;x({column:t,direction:r,sortFunc:e})},p=m.sortFunc(e.slice(),m.direction);return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)(w.a,{striped:!0,bordered:!0,hover:!0,children:[Object(r.jsx)("thead",{children:Object(r.jsxs)("tr",{children:[Object(r.jsxs)("th",{onClick:function(){return g("nameWithOwner",s)},children:[Object(r.jsx)(f.a,{icon:["fab","github-alt"]})," Repo"," ",Object(r.jsx)(z,{column:"nameWithOwner",orderBy:m})]}),Object(r.jsxs)("th",{onClick:function(){return g("stargazerCount",j)},children:[Object(r.jsx)(f.a,{icon:"star"})," Stars"," ",Object(r.jsx)(z,{column:"stargazerCount",orderBy:m})]}),Object(r.jsxs)("th",{onClick:function(){return g("forkCount",u)},children:[Object(r.jsx)(f.a,{icon:"code-branch"})," Forks"," ",Object(r.jsx)(z,{column:"forkCount",orderBy:m})]}),Object(r.jsxs)("th",{onClick:function(){return g("commits",d)},children:[Object(r.jsx)(f.a,{icon:"dot-circle"})," Commits"," ",Object(r.jsx)(z,{column:"commits",orderBy:m})]}),Object(r.jsx)(A,{onHeaderClick:g,sortByCommittedDate:b,orderBy:m})]})}),Object(r.jsx)("tbody",{children:R(p,n,o).map((function(t){return Object(r.jsx)(M,{info:t},t.nameWithOwner)}))})]}),Object(r.jsx)(B.a,{itemClass:"page-item",linkClass:"page-link",activePage:n,itemsCountPerPage:o,totalItemsCount:e.length,pageRangeDisplayed:5,onChange:a})]})},T=n(182),W=function(t){var e=t.detail,n=t.onClose,o=Object(c.useState)(!0),a=Object(l.a)(o,2),i=a[0],s=a[1];return Object(r.jsxs)(T.a,{show:i,onHide:function(){s(!1),n()},animation:!1,children:[Object(r.jsx)(T.a.Header,{closeButton:!0,className:"bg-warning",children:Object(r.jsx)(T.a.Title,{children:"Error"})}),Object(r.jsx)(T.a.Body,{children:e})]})};W.defaultProps={onClose:null};var E=W,H=n(136),F=n(137),q=n(125),I=n(104),L=n(126),_=n.n(L),G=n(78),Z=n(127);function $(){var t=Object(q.a)(['\n  query Forks($owner: String!, $name: String!) {\n    repository(owner: $owner, name: $name) {\n      nameWithOwner\n      stargazerCount\n      forkCount\n      object(expression: "master") {\n        ... on Commit {\n          committedDate\n          history {\n            totalCount\n          }\n        }\n      }\n      forks(first: 100, orderBy: { field: STARGAZERS, direction: DESC }) {\n        nodes {\n          nameWithOwner\n          stargazerCount\n          forkCount\n          object(expression: "master") {\n            ... on Commit {\n              committedDate\n              history {\n                totalCount\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n']);return $=function(){return t},t}var J=Object(G.createHttpLink)({uri:"https://api.github.com/graphql"}),Q=atob("Z2hwX1c0Y1RRcE55bzRQdkt6ZUlhM3lDREZRa0VGNk8wdzNzRVdhQw==");_()(Q,"REACT_APP_GITHUB_PAT environment variable must be set");var U=Object(Z.a)((function(t,e){var n=e.headers;return{headers:Object(I.a)(Object(I.a)({},n),{},{authorization:"Bearer ".concat(Q)})}})),V=new G.ApolloClient({link:U.concat(J),cache:new G.InMemoryCache}),X=Object(G.gql)($()),Y=function(t,e,n){var r=function(t){return g(t)&&g(t).slice(1,3)}(t),c=Object(l.a)(r,2),o=c[0],a=c[1];V.query({query:X,variables:{owner:o,name:a}}).then((function(t){return e(function(t){var e=t.data.repository,n=e.forks;return[Object(F.a)(e,["forks"])].concat(Object(H.a)(n.nodes))}(t))})).catch((function(t){return n(t)}))},K=function(){var t=Object(c.useState)(),e=Object(l.a)(t,2),n=e[0],o=e[1],a=Object(c.useState)(null),i=Object(l.a)(a,2),s=i[0],j=i[1],u=Object(c.useState)(1),b=Object(l.a)(u,2),h=b[0],O=b[1],m=Object(c.useState)(!1),f=Object(l.a)(m,2),x=f[0],g=f[1],p=function(t){o(t),j(null),g(!1)},k=function(t){j(t),g(!1)},v=s?Object(r.jsx)(E,{detail:s.message}):null,y=n?Object(r.jsx)(N,{forks:n,activePage:h,itemsCountPerPage:10,onPageChange:O}):null;return Object(r.jsxs)(d.a,{children:[v,Object(r.jsx)(C,{onSubmit:function(t){g(!0),Y(t,p,k)},loading:x}),y]})},tt=n(94),et=function(){return Object(r.jsx)("footer",{className:"footer d-none d-md-block",children:Object(r.jsx)(d.a,{className:"text-center",children:Object(r.jsxs)("span",{children:["Copyright \xa9 Andre Miras 2020 - gitpop3 v",tt.a]})})})},nt=n(185),rt=n(184),ct=function(){return Object(r.jsx)(nt.a,{bg:"dark",variant:"dark",expand:"sm",className:"mb-4",children:Object(r.jsxs)(d.a,{children:[Object(r.jsxs)(nt.a.Brand,{href:"/gitpop3",children:[Object(r.jsx)(f.a,{icon:"code-branch"})," GitPop3"]}),Object(r.jsx)(nt.a.Toggle,{}),Object(r.jsx)(nt.a.Collapse,{children:Object(r.jsxs)(rt.a,{className:"mr-auto",children:[Object(r.jsxs)(rt.a.Link,{href:"/gitpop3",children:[Object(r.jsx)(f.a,{icon:"home"})," Home"]}),Object(r.jsxs)(rt.a.Link,{href:"https://github.com/AndreMiras/gitpop3",children:[Object(r.jsx)(f.a,{icon:["fab","github-alt"]})," About"]})]})})]})})},ot=n(181),at=n(135);(function(){ot.a({dsn:"https://46cd951350084768a0306d2c223f7805@o87984.ingest.sentry.io/5575586",release:tt.a,autoSessionTracking:!0,integrations:[new at.a.BrowserTracing],tracesSampleRate:1})})(),s.b.add(j.a,u.a);var it=function(){return Object(r.jsxs)("div",{className:"App",children:[Object(r.jsx)(ct,{}),Object(r.jsx)(K,{}),Object(r.jsx)(et,{})]})};i.a.render(Object(r.jsx)(o.a.StrictMode,{children:Object(r.jsx)(it,{})}),document.getElementById("root"))},94:function(t){t.exports=JSON.parse('{"a":"2020.12.19"}')}},[[165,1,2]]]);
//# sourceMappingURL=main.078c7f73.chunk.js.map