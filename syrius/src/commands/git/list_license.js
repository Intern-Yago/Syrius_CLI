module.exports={
    name: 'list:license',
    description: 'List possibles licenses',
    run: async toolbox=>{
        const verde = "\033[0;32m"
        const reset = "\033[0m"

        console.log(`
Possible licenses
------------------
${verde}MIT${reset} - A short and simple permissive license with conditions only requiring preservation of copyright and license notices.
${verde}ISC${reset} - A permissive license lets people do anything with your code with proper attribution and without warranty"
${verde}GNU(GPLv3)${reset} - Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license.
${verde}Apache(2.0)${reset} - A permissive license whose main conditions require preservation of copyright and license notices.
\nFor more information access: https://choosealicense.com/`) 
    },

}