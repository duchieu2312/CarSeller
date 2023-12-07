import { stringify } from "query-string";

import {
  fetchUtils,
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  UPDATE_MANY,
  DELETE,
  DELETE_MANY
} from "react-admin";

/**
 * Maps react-admin queries to a REST API implemented using Java Spring Boot and Swagger
 *
 * @example
 * GET_LIST     => GET http://my.api.url/posts?page=0&pageSize=10
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts?id=1234&id=5678
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts
 * DELETE       => DELETE http://my.api.url/posts/123
 */

export default (apiUrl, httpClient = fetchUtils.fetchJson) => {
  /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} { url, options } The HTTP request parameters
     */
  const convertDataRequestToHTTP = (type, resource, params) => {
    let url = "";
    const options = {};  
    switch (type) {
      case GET_LIST: {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            ...fetchUtils.flattenObject(params.filter),
            sortField: field,
            sortOrder: order,
        };
        url = `${apiUrl}/${resource}?${stringify(query)}&page=${page}&pageSize=${perPage}`;
        break;
      }
      case GET_ONE:
        url = `${apiUrl}/${resource}/${params.id}`;
        break;
      case GET_MANY: {
        const query = {
            id: params.ids,
        };
        url = `${apiUrl}/${resource}/${stringify(query)}`;
        break;
      }
      case GET_MANY_REFERENCE: {
        const { page, perPage } = params.pagination;
        url = `${apiUrl}/${resource}?page=${page}&pageSize=${perPage}`;
        break;
      }
      case UPDATE:
<<<<<<< HEAD
        url = `${apiUrl}/${resource}/${params.id}`;

        if(resource == 'models'){
=======
        url = `${apiUrl}/${resource}/edit/${params.id}`;
        if(resource == 'models' && params.data.imageName.rawFile != undefined){
          const formData = new FormData()
          formData.append('id',params.data.id)
          formData.append('nameModel',params.data.nameModel)
          formData.append('info',params.data.info)
          formData.append('imageFile',params.data.imageName.rawFile)
          options.body=formData
        }
        else if(resource == 'models' && params.data.imageName.rawFile == undefined){
>>>>>>> ee9452c7f5877694ee185e63aa8a35d45c4eca27
          console.log(params.data)
          const formData = new FormData()
          formData.append('id',params.data.id)
          formData.append('nameModel',params.data.nameModel)
          formData.append('info',params.data.info)
          if(params.data.imageName != null)
            formData.append('imageFile',params.data.imageName.rawFile)
          options.body=formData
        }
        else if(resource == 'versions'){
          const formData = new FormData()
          formData.append('id',params.data.id)
          formData.append('airBag',params.data.airBag)
          formData.append('antiTheft',params.data.antiTheft)
          formData.append('autoLock',params.data.autoLock)
          formData.append('backCamera',params.data.backCamera)
          formData.append('doorHandle',params.data.doorHandle)
          formData.append('frontBrakes',params.data.frontBrakes)
          formData.append('frontFogLight',params.data.frontFogLight)
          formData.append('gasCap',params.data.gasCap)
          formData.append('info',params.data.info)
          formData.append('modelId',params.data.modelId)
          formData.append('nameVersion',params.data.nameVersion)
          formData.append('numCarSeat',params.data.numCarSeat)
          formData.append('price',params.data.price)
          formData.append('rearBrakes',params.data.rearBrakes)
          formData.append('seatMaterial',params.data.seatMaterial)
          formData.append('wiperBlade',params.data.wiperBlade)
          formData.append('wrappedSteeringWheelAndGearLever',params.data.wswandgl)
          params.data.colors.forEach((color,index) => {
            const colorObject = new Object()
            colorObject.color = color.color
            
            console.log(color)
            if(color.imageName != null)
              colorObject.imageName = color.imageName
            else
              if(color.imageFile != undefined)
                colorObject.imageName = color.imageFile.title
              else
                colorObject.imageName = "empty"

            formData.append('colors',JSON.stringify(colorObject))
            
            if(color.imageFile != undefined)
              formData.append('colorFiles',color.imageFile.rawFile)
          });
          options.body=formData
        } 
        else {
          options.body = JSON.stringify(params.data);
        }
        options.method = "PUT";
        break;
      case CREATE:
        url = `${apiUrl}/${resource}`;
        if(resource == 'models' && params.data.imageFile != undefined){
          const formData = new FormData()
          formData.append('nameModel',params.data.nameModel)
          formData.append('info',params.data.info)
          formData.append('imageFile',params.data.imageFile.rawFile)
          options.body=formData
        }
        else if(resource == 'versions'){
          const formData = new FormData()
          formData.append('airBag',params.data.airBag)
          formData.append('antiTheft',params.data.antiTheft)
          formData.append('autoLock',params.data.autoLock)
          formData.append('backCamera',params.data.backCamera)
          formData.append('doorHandle',params.data.doorHandle)
          formData.append('frontBrakes',params.data.frontBrakes)
          formData.append('frontFogLight',params.data.frontFogLight)
          formData.append('gasCap',params.data.gasCap)
          formData.append('info',params.data.info)
          formData.append('modelId',params.data.modelId)
          formData.append('nameVersion',params.data.nameVersion)
          formData.append('numCarSeat',params.data.numCarSeat)
          formData.append('price',params.data.price)
          formData.append('rearBrakes',params.data.rearBrakes)
          formData.append('seatMaterial',params.data.seatMaterial)
          formData.append('wiperBlade',params.data.wiperBlade)
          formData.append('wrappedSteeringWheelAndGearLever',params.data.wswandgl)
          params.data.colors.forEach((color,index) => {
            formData.append('colorNames',color.color)
            if(color.imageFile != null){
              formData.append('colorFiles',color.imageFile[0].rawFile)
              formData.append('isImages',true)
            }
            else{
              formData.append('colorFiles',color.imageFile)
              formData.append('isImages',false)
            }
          });

          options.body=formData
        }
        else
         options.body = JSON.stringify(params.data);
        
        options.method = "POST";
      
        break;
      case DELETE:
        url = `${apiUrl}/${resource}/${params.id}`;
        options.method = "DELETE";
        break;
      default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
    return { url, options };
  };

  /**
     * @param {Object} response HTTP response from fetch()
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} Data response
     */
  const convertHTTPResponse = (response, type, resource, params) => {
    const { headers, json } = response;
    switch (type) {
      case GET_LIST:
      case GET_MANY_REFERENCE:
        if (!json.hasOwnProperty("totalElements")) {
          throw new Error(
            "The numberOfElements property must be must be present in the Json response"
          );
        }
        return {
          data: json.content,
          total: parseInt(json.totalElements, 10)
        };
      case CREATE:
        return { data: { ...params.data, id: json.id } };
      default:
        return { data: json };
    }
  };

  /**
     * @param {string} type Request type, e.g GET_LIST
     * @param {string} resource Resource name, e.g. "posts"
     * @param {Object} payload Request parameters. Depends on the request type
     * @returns {Promise} the Promise for a data response
     */
  return (type, resource, params) => {
    // simple-rest doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
    if (type === UPDATE_MANY) {
      return Promise.all(
        params.ids.map(id =>
          httpClient(`${apiUrl}/${resource}/${id}`, {
            method: "PUT",
            body: JSON.stringify(params.data)
          })
        )
      ).then(responses => ({
        data: responses.map(response => response.json)
      }));
    }
    // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
    if (type === DELETE_MANY) {
      return Promise.all(
        params.ids.map(id =>
          httpClient(`${apiUrl}/${resource}/${id}`, {
            method: "DELETE"
          })
        )
      ).then(responses => ({
        data: responses.map(response => response.json)
      }));
    }

    const { url, options } = convertDataRequestToHTTP(type, resource, params);
    return httpClient(url, options).then(response =>
      convertHTTPResponse(response, type, resource, params)
    );
  };
};