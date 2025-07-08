import axios from "axios";
const url = "/api/persons";
const getall = () => {
  return axios.get(url).then((response) => response.data);
};
const create = (newperson) => {
  return axios.post(url, newperson).then((response) => response.data);
};
const update = (id, newperson) => {
  return axios.put(`${url}/${id}`, newperson).then((response) => response.data);
};
const remove = (id) => {
  return axios.delete(`${url}/${id}`);
};

export default { getall, create, update, remove };
