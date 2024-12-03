const createStudent = async (req: Request, res: Response) => {
  try {
    const { student } = req.body;

    const zodValidation = studentZodSchema.safeParse(student);

    if (!zodValidation.success) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: zodValidation.error.format(),
      });
    }
    // will call service func to send this data
    const result = await StudentServices.createStudentInToDB(student);

    // send response
    res.status(201).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      // error: error,
    });
  }
};
