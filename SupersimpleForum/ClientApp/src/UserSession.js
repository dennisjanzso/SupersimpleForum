
var UserSession = (function() {
    var username = "";
    var navMenu = null;

    var getUsername = function() {
        return username;
    };

    var setUsername = function(name) {
        username = name;
    };

    var checkSession = function () {
        if (username.length == 0) {
            return false;
        } else {return true;}
    };
    
    var logout = function () {
        username = "";
    }
    
    var attachNavMenu = function (nav) {
        navMenu = nav
    }
    
    var updateNavMenu = function () {
        try {
            navMenu.forceUpdate()
        } catch (e) {
            
        }
    }
                                   

    return {
        getUsername,
        setUsername,
        checkSession,
        logout,
        attachNavMenu,
        updateNavMenu
    }

})();

export default UserSession;