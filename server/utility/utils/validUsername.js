export function isValidUsername(username) {
    // Regular expression to match letters, numbers, and underscores
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
  
    return usernameRegex.test(username);
  }