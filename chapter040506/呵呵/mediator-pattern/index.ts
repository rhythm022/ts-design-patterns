
interface LocationResult {
    country: any,
    province: any,
    city: any,
}
class LocationPicker {
    //结构
    $country = $(document.createElement("select"))
    $province = $(document.createElement("select"))
    $city = $(document.createElement("select"))

    $element = $(document.createElement("div"))
        .append(this.$country)
        .append(this.$province)
        .append(this.$city)

    constructor() {
        //内容
        LocationPicker
            .setOptions(this.$country, LocationPicker.getCountries())
        LocationPicker.setOptions(this.$province, ['-']);
        LocationPicker.setOptions(this.$city, ['-']);

        this.$country.change(() => {
            this.updateProvinceOptions();
        })

        this.$country.change(() => {
            this.updateCityOptions()
        })
    }

    updateProvinceOptions(): void {
        let country = this.$country.val() as string

        let provinces = LocationPicker.getProvincesByCountry(country)
        LocationPicker.setOptions(this.$province, provinces);

        this.$city.val('-')
    }

    updateCityOptions(): void {
        let country: string = this.$country.val() as string;
        let province: string = this.$province.val() as string;

        let cities = LocationPicker
            .getCitiesByCountryAndProvince(country, province);
        LocationPicker.setOptions(this.$city, cities)
    }
    // get value(): LocationResult {
    //     return {
    //         country: this.$country.val(),
    //         province: this.$province.val(),
    //         city: this.$city.val(),
    //     };
    // }

    private static setOptions(
        $select: JQuery,
        values: string[],
    ): void {
        $select.empty();

        let $options = values.map(value => {
            return $(document.createElement('option'))
                .text(value)
                .val(value);
        });

        $select.append($options)

    }

    private static getCountries(): string[] {
        return [''].concat([/**/])
    }
    private static getProvincesByCountry(
        country: string
    ): string[] {
        return ['-'].concat([/**provinces */])
    }
    private static getCitiesByCountryAndProvince(
        country: string,
        province: string,
    ): string[] {
        return ['-'].concat([/**cities */])
    }




}