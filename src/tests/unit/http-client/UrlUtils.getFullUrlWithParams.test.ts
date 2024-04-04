import { UrlUtils } from "../../../http-client";

describe('Urlutils: getFullUrlWithParams', () => {

    it('should return fullUrl formatted as expected with no param', () => {
        const endpoint = 'https://unit-test-api/v1/domain/'
        const params = {
        }

        const result = UrlUtils.getFullUrlwithParams(endpoint, params)
        expect('https://unit-test-api/v1/domain/').toEqual(result)
    })

    it('should return fullUrl formatted as expected with one param', () => {
        const endpoint = 'https://unit-test-api/v1/domain/[catalogId]'
        const params = {
            catalogId: 4356
        }

        const result = UrlUtils.getFullUrlwithParams(endpoint, params)
        expect('https://unit-test-api/v1/domain/4356').toEqual(result)
    })

    it('should return fullUrl formatted as expected with two param', () => {
        const endpoint = 'https://unit-test-api/v1/domain/[catalogId]/[partId]'
        const params = {
            catalogId: 4356,
            partId: 'asedf23'
        }

        const result = UrlUtils.getFullUrlwithParams(endpoint, params)
        expect('https://unit-test-api/v1/domain/4356/asedf23').toEqual(result)
    })

    it('should return fullUrl formatted as expected with multiple params', () => {
        const endpoint = 'https://unit-test-api/v1/domain/[country]/[district]/[cityId]'
        const params = {
            country: 'Uganda',
            district: 'Kampala',
            cityId: '45rfy'
        }

        const result = UrlUtils.getFullUrlwithParams(endpoint, params)

        expect('https://unit-test-api/v1/domain/Uganda/Kampala/45rfy').toEqual(result)
    })
})