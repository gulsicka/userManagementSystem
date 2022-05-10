import { Button, Input } from "@mui/material";
import { Controller } from "react-hook-form";
import { useUserFormStyle } from "./UserForm.styles";

const NewUserForm = (props) => {
  const {
    control,
    handleSubmit,
    onSubmit,
    setAddUser,
    handleFormClose,
    register,
    isEdit,
    updateUser,
  } = props;

  const classes = useUserFormStyle();

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className={classes.outerDiv}>
        <Controller
          render={({ field }) => (
            <Input
              ref={register("id")}
              name="id"
              placeholder="Enter user ID..."
              disabled={isEdit}
              {...field}
            />
          )}
          name="id"
          control={control}
        />
        <Controller
          render={({ field }) => (
            <Input
              ref={register("name")}
              name="name"
              placeholder="Enter user name..."
              {...field}
            />
          )}
          name="name"
          control={control}
        />
        <Controller
          render={({ field }) => (
            <Input
              ref={register("email")}
              placeholder="Enter user email..."
              lable="Email Address"
              name="email"
              {...field}
            />
          )}
          name="email"
          control={control}
        />
        <Controller
          render={({ field }) => (
            <Input
              ref={register("age")}
              name="age"
              placeholder="Enter user age..."
              lable="Age"
              {...field}
            />
          )}
          name="age"
          control={control}
        />
        {!isEdit && (
          <Controller
            render={({ field }) => (
              <Input
                ref={register("password")}
                name="password"
                placeholder="Enter user password..."
                lable="password"
                {...field}
              />
            )}
            name="password"
            control={control}
          />
        )}
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          {`${isEdit ? "Update" : "Create"} User`}
        </Button>
        <Button onClick={handleFormClose}>Cancel</Button>
      </div>
    </form>
  );
};

export default NewUserForm;
