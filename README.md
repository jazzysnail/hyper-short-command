# HyperShortCommand
Extension for Hyper that define a long command as a short command.

# Install
Open Hyper and input command `hyper install hyper-short-command`, or add 'hyper-short-command' to `plugins` in `~/hyper.js`.

# How to use
Following is what my short command look like but feel free to change them as you like to better suit your development needs.
Add the following to `~/.hyper.js`.

``` js
module.exports = {
    config: {
        hyperShortCommand: {
            trigger: 'space',
            transform: [
                { keyword:'n:dev', command: 'npm run dev'},
                { keyword:'g:stt', command: 'git status'},
            ]
        }
    }
}
```

# License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/jazzysnail/hyper-short-command/blob/main/LICENSE) file for details