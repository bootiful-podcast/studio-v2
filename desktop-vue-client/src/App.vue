<style>
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css");
@import url('https://fonts.googleapis.com/css2?family=Titillium+Web:wght@200;300;400;700;900&display=swap');


:root {
  --clr-green: #76B420;
  --clr-gray: #E8E8E8;
  --clr-blue: #4C5F76;
  --clr-green-darker: #60911C;
  --clr-green-darkest: #426414;
  --panel__margin: 2rem;
  --bold-letter-spacing: .15em;
  --clr-gray-darker: rgba(0, 0, 0, .5);
  --larger-text-line-height: .7em;
}


.menu .action:hover {
  color: black;
  text-decoration: none;
}

.menu .action:hover:before {
  content: '';
  display: inline;
  float: left;
  width: 30px;
  padding-right: 10px;
  margin-left: -40px;
  height: 1.5rem;
  background-color: var(--clr-green-darkest);
}

a:hover {
  color: var(--clr-blue);
}

.sidebar h1 {
  font-size: 1.5em;
}


.tip {
  position: relative;
  padding-left: calc(var(--panel__margin) / 2);
  padding-top: var(--panel__margin);
  padding-bottom: var(--panel__margin);
  padding-right: calc(.25 * var(--panel__margin));
  color: white;
  z-index: 10;
}

.menu {
  z-index: -10;
}

.menu > * {
  margin: 0;
  color: white;
  padding: 0 0 0 var(--panel__margin);
}

.menu .action {
  font-size: 2em;
  line-height: var(--larger-text-line-height);
  text-transform: uppercase;
  display: block;
  font-weight: 700;
}


.menu {
  background-color: var(--clr-green-darker);
  margin-top: 4rem;
}

.tip {
  background-color: var(--clr-blue);
}

.footer {
  grid-area: footer;
}


.panel__prompt {
  text-transform: uppercase;
  font-weight: 900;
  letter-spacing: var(--bold-letter-spacing);
}

.panel__prompt .file-type {
  font-weight: 500;
  font-size: smaller;
}


.panel__section {
  font-size: 1.5rem;
  opacity: 50%;
  margin-top: calc(.5 * var(--panel__margin))
}

a {
  color: black;

}

a:hover {
  color: var(--clr-blue);
}


*. *::after, *::before {
  box-sizing: border-box;
}

body {
  background-color: var(--clr-green);
  font-family: 'Titillium Web', sans-serif;

}

.form-control {
  background-color: var(--clr-gray);

}

.screen {
  height: 100vh;
  bottom: 0;
  display: grid;
  grid-template-areas:
                    "header header header  "
                    "sidebar content . "
                    "footer footer footer  ";
  grid-template-rows: 140px auto 200px;
  grid-template-columns: 250px auto 250px;
}

html {
  height: 100%;
}

body {
  min-height: 100%;
  padding: 0;
  margin: 0;
}

.buttons {
  right: 0;
  justify-content: flex-end;
  text-align: right;
}


.action {
  padding-left: 1em;
  font-size: larger;
  letter-spacing: var(--bold-letter-spacing);
  text-transform: uppercase;
}

.action__main {
  font-weight: 900;
}

.action__alternative {
  font-weight: 500;
  letter-spacing: calc(var(--bold-letter-spacing) / 2);
}

.logo {
  background: red;
  height: 100%;
  width: 400px;
  border: 0 solid black;
  background: url("assets/bootiful-podcast-logo.png");
  background-size: cover;
}

.header {
  grid-area: header;
}


.sidebar {
  grid-area: sidebar;
}

.content {
  grid-area: content;
}

.sidebar {
  grid-area: sidebar;
}

.panel {
  display: block;
  background-color: white;
  padding-left: var(--panel__margin);
  padding-right: var(--panel__margin);
  box-shadow: -5px 5px 10px 5px rgba(0, 0, 0, 0.30);
  padding-bottom: var(--panel__margin);
  margin-top: 2rem;
}

.panel__title {
  background-color: black;
  color: white;
  text-transform: uppercase;
  letter-spacing: .1em;
  margin-left: calc(-1 * var(--panel__margin));
  margin-right: calc(-1 * var(--panel__margin));
  padding-left: var(--panel__margin);
  padding-right: var(--panel__margin);
  bottom: 0;
  font-size: 1.5rem;
  padding-top: calc(.8 * var(--panel__margin));
  font-weight: 700;
  line-height: var(--larger-text-line-height);
}


</style>
<template>
  <Page>

    <div slot="sidebar">
      <div class="tip">
        <h1> Tips for Creating a Good Episode:</h1>
        <UL>
          <LI> Give it a pithy title</LI>
          <LI> Use Markdown for the description to include links and resources
          </LI>
          <LI> Make sure your image
            is 400x400 or larger
          </LI>
        </UL>
      </div>
    </div>

    <Panel title-text="this is a panel">
      this is the body of a panel
    </Panel>

    <Panel title-text="this is also a panel">
      this is the body of a panel
    </Panel>

  </Page>
</template>
<script>


import Page from "@/components/Page";
import Panel from "@/components/Panel";
// import Panel from "@/components/Panel";

export default {
  name: 'App',
  mounted() {
  },
  created() {


  },
  methods: {},
  data() {


    return {
      count: 0,
      showSearch: true,
      account: {}
    }
  },
  components: {
    Panel,
    //   Panel,
    Page
  }
}
</script>
