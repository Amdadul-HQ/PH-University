import QueryBuilder from "../../app/builder/QueryBuilder"
import { FacultySearchableFields } from "./faculty.constant"
import { IFaculty } from "./faculty.interface";
import { Faculty } from "./faculty.model"

const getAllFacultyFromDB = async(query:Record<string,unknown>) =>{
    const facultyQuery = new QueryBuilder(
      Faculty.find().populate('academicDepartment'),
      query
    ).search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

    const result = await facultyQuery.modelQuery;
    return result;
}


const getSingleFacultyFromDB = async(id:string) =>{
  const result = await Faculty.findById(id).populate('academicDepartment');
  return result;
}


const updateFacultyInToDB = async(id:string,payload: Partial<IFaculty>) =>{
  const {name,...remaningFacultyData} = payload;

  const modifiedUpdateData :Record<string,unknown> = {
    ...remaningFacultyData,
  };
  if(name && Object.keys(name).length){
    for(const [key,value] of Object.entries(name)){
      modifiedUpdateData[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findByIdAndUpdate(id,modifiedUpdateData,{
    new:true,
    runValidators:true
  })
  return result
}

export const FacultyService = {
    getAllFacultyFromDB,
    getSingleFacultyFromDB,
    updateFacultyInToDB
}