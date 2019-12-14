const win = process.browser ? window : null;
const doc = process.browser ? document : null;
const localStorage = process.browser ? win.localStorage : null;

function localStorageSetObject(key, obj) {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(obj));
  }
}

function localStorageGetObject(key) {
  if (process.server) {
    return null;
  }
  const value = localStorage.getItem(key);
  return value && JSON.parse(value);
}

function showError(innerErrorMessage, error) {
  if (process.server) {
    return null;
  }

  const errorData = error.data || error;
  let details = "";

  if (error.status === 401) {
    showBox("Your session has been expired (unauthorized user)", 2000);
    setTimeout(
      function () {
        win.location.reload();
      },
      2000
    );
    return false;
  }
  if (error.response && error.response.data && error.response.data.message) {
    details = error.response.data.message;
  } else if (typeof errorData.message === "string") {
    details = errorData.message;
  } else {
    details = JSON.stringify(errorData);
  }
  showErrorMessage(innerErrorMessage + "<br/>Details: " + details);
}

let showBox = function (message, delayTime) {
  if (process.server) {
    return false;
  }

  const boxId = "show-box";
  let boxEl = doc.getElementById(boxId);
  let timeout = 0;

  if (!doc.body) {
    setTimeout(
      function () {
        showBox(message, delayTime);
      },
      500
    );
    return false;
  }
  if (boxEl === null) {
    boxEl = doc.createElement("div");
    boxEl.setAttribute("id", boxId);
    boxEl.style.cssText = "position: fixed; z-index: 20001; left: 0; top: 0; width: 100%; height: 0px; font-weight: bold; margin: 0; font-family: arial,sans-serif; font-size: 14px; text-align: center; white-space: nowrap;";
    doc.body.appendChild(boxEl);
  }
  showBox = function (message, delayTime) {
    delayTime = delayTime || 2000;
    if (message === false) {
      boxEl.style.display = "none";
      return true;
    }
    clearTimeout(timeout);
    boxEl.style.display = "block";
    //temp fix for too long error messages
    message = message.replace(/\\n/g, "<br/>");
    if (message.length > 200) {
      message = message.substring(0, 200) + "...";
    }

    boxEl.innerHTML = "<div style=\"position: relative; display: inline-block; color: #222222; padding: 6px 10px 6px 12px; border: 1px solid #F0C36D; border-radius: 0 0 2px 2px; box-shadow: 0 2px 4px rgba(0,0,0,0.2); background: #F9EDBE;\"><span>" + message + "</span></div>";
    timeout = setTimeout(function () {
      showBox(false);
    }, delayTime);
  };
  return showBox(message, delayTime);
};

function showErrorMessage(message) {
  if (process.server) {
    return false;
  }
  const location = win.location;
  const urlHash = location.hash;
  let documentUrl = doc.URL || location.href;

  documentUrl += documentUrl.indexOf(urlHash) === -1 ? urlHash : ""; // Add hash for IE
  logError(message.indexOf("Critical Error") === 0 ? "Critical" : "Major", message + "; documentUrl =" + documentUrl);
  message = message.replace(new RegExp("\n", "g"), "<br>");
  showBox(message, 7000);
}

/* save error description save on server. Pass data as image link to avoid ajax call */
function logError(/*severity, message*/) {
  if (process.server) {
    return false;
  }
  //message = message.substr(0, 1900); //IE max 2048 characters in get request
  //this line send error message to the server for saving in log/js.log file and further investigation
  //new Image().src = "/log/jsError.srs?msg=" + encodeURIComponent("Severity: " + severity + "; " + message);
}


/*
export const fetchDeep = function (component) {
  const originFn = component.asyncData;
  component.asyncData = async function (ctx) {
    if (component.components) {
      const promisesToResolve = [];
      let childComponents = Object.values(component.components);
      while (childComponents.length) {
        let comp = childComponents.pop();
        if (comp.asyncData) {
          promisesToResolve.push(comp.asyncData(ctx));
        }
        if (comp.fetch) {
          promisesToResolve.push(comp.fetch(ctx));
        }
        if (comp.components) {
          childComponents.push(...Object.values(comp.components));
        }
      }
      await Promise.all(promisesToResolve);
    }
    return (originFn && originFn(ctx)) || Promise.resolve();
  };
  return component;
};
*/

function showMessage(message, delayTime) {
  return showBox(message, delayTime);
}

/*
function isMobileOrTablet () {
  const me = this;
  return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent));
}
*/

function scrollElementIntoView(domElement) {
  if (process.server) {
    return false;
  }

  // Skip scrolling on small devices
  const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  if (windowWidth < 769) {
    return false;
  }
  setTimeout(
    function () {
      if (domElement) {
        domElement.scrollIntoView({
          //behavior: "smooth",//instant by default
          block: "nearest",
          inline: "nearest"
        });
      }
    },
    10
  );
}

function generateFile(url, data) {
  if (process.server) {
    return false;
  }
  const doc = document;
  const form = doc.createElement("form");
  form.action = url;
  form.method = "GET";//"POST";//temp
  form.target = "_blank";
  form.style.display = "none";

  if (data) {
    const input = doc.createElement("input");
    input.type = "text";
    input.name = "data";
    input.value = JSON.stringify(data);
    form.appendChild(input);
  }
  const docBody = doc.body;
  docBody.appendChild(form);
  form.submit();
  docBody.removeChild(form);
}

export default {
  localStorageSetObject: localStorageSetObject,
  localStorageGetObject: localStorageGetObject,
  showError: showError,
  showMessage: showMessage,
  scrollElementIntoView: scrollElementIntoView,
  generateFile: generateFile
};