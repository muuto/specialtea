

    var form = document.fm.sol.value;
      , resHtml = document.getElementById('result')
      ;

    function commit() {
        alert('エラーおきた');
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.github.com/markdown/raw');
        xhr.setRequestHeader('Content-Type', 'text/plain');
        xhr.onload = function(ev){
            resHtml.innerHTML = xhr.responseText;
        };
        xhr.onerror = function(ev){
            alert('エラーおきた');
        };
        xhr.send(form.markdown.value);
    }
