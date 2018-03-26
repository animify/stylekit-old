class Constants {
    static scrollOptionsPageLoad = {
        offset: -100,
        align: 'top',
        duration: 1
    };

    static scrollOptionsScrollTo = { ...Constants.scrollOptionsPageLoad, duration: 500 };
}

export default Constants;
