import User from "../models/User.js";


export const deleteUser = async (
  req,
  res
) => {
  try {
    const user =
      await User.findByPk(
        req.params.id
      );

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    await user.destroy();

    res.json({
      success: true,
      message: "User Deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getAllUsers = async (
  req,
  res
) => {
  try {
    const users =
      await User.findAll();

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
/*
GET PROFILE
*/
export const getProfile = async (
req,
res
) => {
try {
const user = await User.findByPk(
req.user.id
);


if (!user) {
  return res.status(404).json({
    message: "User Not Found",
  });
}

const safeUser = {
  id: user.id,
  fullName: user.fullName,
  username: user.username,
  age: user.age,
  address: user.address,
  mobile: user.mobile,
  email: user.email,
  profilePic: user.profilePic,
  role: user.role,
  createdAt: user.createdAt,
};

res.json(safeUser);


} catch (error) {
console.log(error);

res.status(500).json({
  message: "Server Error",
});


}
};

export const getMembers =
async(req,res)=>{

 try{

  const users =
  await User.findAll({
   attributes:[
    "id",
    "fullName",
    "profilePic",
    "online",
    "lastSeen"
   ]
  });

  res.json(users);

 }catch(error){

  res.status(500).json({
   message:"Server Error"
  });

 }

};



/*
UPDATE PROFILE
*/
export const updateProfile = async (
  req,
  res
) => {
  try {
    const user =
      await User.findByPk(
        req.user.id
      );

    if (!user) {
      return res.status(404).json({
        message:
          "User Not Found",
      });
    }

    const updateData = {
      fullName:
        req.body.fullName,
      age:
        req.body.age,
      address:
        req.body.address,
      mobile:
        req.body.mobile,
      email:
        req.body.email,
    };

    if (req.file) {
      updateData.profilePic =
        req.file.path.replace(
          /\\/g,
          "/"
        );
    }

    await user.update(
      updateData
    );

    res.json({
      success: true,
      message:
        "Profile Updated Successfully",
      user,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Server Error",
    });
  }
};