import ApiList from './apiList';
import { url } from './baseurl';
import request from './request';

export function getBaseUrl() {
    return url;
}

export async function getAllDiscrepancies(data = {}) {
    return request.get(ApiList.All, data);
}

export async function getDiscrepanciesByPlayer(data = {}) {
    return request.get(ApiList.Player, data);
}

export async function getDiscrepanciesByGame(data = {}) {
    return request.get(ApiList.Game, data);
}

export async function getDiscrepanciesByTeam(data = {}) {
    return request.get(ApiList.Team, data);
}