// Utility functions

/**
 * Handle errors from api call
 * @param response from api call
 * @return if response was resolved successfully, response
 * is returned; if response was rejected an error is thrown.
 */
const handleErrors = (response) => {
    if (!response.ok) {
      throw new Error ("Something went wrong.")
    }
    return response; 
}

 const toTitleCase = (title) => {
    let titleLowercase = title.toLowerCase();
    const titleCaseArray = titleLowercase.split(" ").map(word => 
            `${word[0].toUpperCase()}${word.slice(1)}`);
    return titleCaseArray.join(" ");
}

export {handleErrors, toTitleCase};