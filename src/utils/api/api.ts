import ApiList from './apiList';
import { url } from './baseurl';
import request from './request';

export function getBaseUrl() {
    return url;
}

export async function getAllDiscrepancies(data = {}) {
    return request.post(ApiList.All, data);
}

export async function getDiscrepanciesByPlayer(data = {}) {
    return request.post(ApiList.Player, data);
}

export async function getDiscrepanciesByGame(data = {}) {
    return request.post(ApiList.Game, data);
}

export async function getDiscrepanciesByTeam(data = {}) {
    return request.post(ApiList.Team, data);
}