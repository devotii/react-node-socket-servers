<div align="center">
  <h1 align="center">Multi Socket Servers</h1>
  
![React][React.js]
![NodeJS][Node.js]
    
</div>

<h2>Information</h2>

  * Secure socket communication between a client, parent server, and multiple child servers.
  * Easy to use, nothing messy.

<h4>React</h4>

  * Send requests.
  * Receive response.

<h4>Parent server</h4>

  * Nothing to do to get communication with child servers.
  * Selects a random child server to communicate with.

<h4>Child server</h4>

  * Only 4 things to set up in the configuration.
  * Start and you will be connected to parent immediately.
  * Then you are ready to begin.


<h2>How to set up</h2>

<h3>React</h3>

  * Go to web/src/config.js.
  * Enter the parent server url.

<h3>Parent server</h3>

  * Go to server/config.js.
  * Enter the settings.
  * <b>IMPORTANT</b> The secret_code must be a secure string.

<h3>Child servers</h3>

  * Go to server_child/config.js.
  * Enter the settings (secret_code must be same as in parent).

<h4>Now you are ready, nothing else to do.</h4>


<p>It can be server settings as firewall, but google exist :)</p>

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
