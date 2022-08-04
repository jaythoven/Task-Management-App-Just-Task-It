// import { Form, Input, Button, Modal, Alert } from "antd"
import { useState } from "react"
import DeleteModal from './DeleteModal'
import {
    Button,
    TextField,
    Alert,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Typography
  } from '@mui/material'

function Profile ({ user, setUser, handleCheckLogin, handleLogoutClick }) {

    const [firstName, setFirstName] = useState(
        user.first_name ? user.first_name : ''
    )
    const [lastName, setLastName] = useState(
        user.last_name ? user.last_name : ''
    )
    const [username, setUsername] = useState(user.username ? user.username : '')
    const [email, setEmail] = useState(user.email ? user.email : '')
    // const [password, setPassword] = useState('')
    // const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])
    const [updated, setUpdated] = useState(false)
    const [loading, setLoading] = useState(false)
    const [togglePassword, setTogglePassword] = useState(false)

    // const [isModalVisible, setIsModalVisible] = useState(false);

    const [openModal, setOpenModal] = useState(false)
    const handleOpenModel = () => setOpenModal(true)
    const handleCloseModel = () => setOpenModal(false)

    // const showModal = () => {
    //     setIsModalVisible(true);
    // };

    // const handleOk = () => {
    //     setIsModalVisible(false);
    //     // const handleDeleteProfile = () => {
    //         fetch(`/api/users/${user.id}`, {
    //           method: 'DELETE',
    //         }).then((response) => {
    //           if (response.ok) {
    //             setUser(handleLogoutClick)
    //             // navigate('/')
    //           }
    //         })
    //     // }
    // };

    // const handleCancel = () => {
    //     setIsModalVisible(false);
    // };

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])
        setUpdated(false)
        setLoading(true)
    
        let updatedUser = {
          first_name: firstName,
          last_name: lastName,
          username,
          email,
        }
        // togglePassword
        //   ? (updatedUser = {
        //       first_name: firstName,
        //       last_name: lastName,
        //       password,
        //       password_confirmation: passwordConfirmation,
        //       email,
        //       username,
        //     })
        //   : (updatedUser = {
        //       first_name: firstName,
        //       last_name: lastName,
        //       email,
        //       username,
        //     })
    
        fetch(`/api/users/${user.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(updatedUser),
        }).then((response) => {
          setLoading(false)
          if (response.ok) {
            response.json().then(() => {
              setUpdated(true)
              handleCheckLogin()
            })
          } else {
            response.json().then((err) => setErrors(err.errors))
          }
        })
      }
    
    // const handlePasswordChangeClick = () => {
    //     setTogglePassword((prevToggle) => !prevToggle)
    // }
    
    const handleDeleteProfile = () => {
        fetch(`/api/users/${user.id}`, {
          method: 'DELETE',
        }).then((response) => {
          if (response.ok) {
            setUser(handleLogoutClick)
          }
        })
    }

    return (
        <>
        <Grid item>
        <Typography component='h1' variant='h4' align='center' paddingTop>
          Edit Profile
        </Typography>
        </Grid>
        <Grid item>
        <form onSubmit={handleSubmit} className='form'>
          <TextField
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          label='First Name'
          variant='outlined'
          fullWidth
        />

        <TextField
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          label='Last Name'
          variant='outlined'
          fullWidth
        />

        <TextField
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          label='Username'
          variant='outlined'
          fullWidth
        />

        <TextField
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          label='Email'
          variant='outlined'
          fullWidth
        />

        {/* <div className={!togglePassword ? 'hidden' : null}>
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            label='Password'
            variant='outlined'
            type='password'
            fullWidth
          />

          <TextField
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            value={passwordConfirmation}
            label='Confirm Password'
            variant='outlined'
            type='password'
            fullWidth
          />
        </div> */}

        {/* <Button
          variant='contained'
          className='b-radius btn btn-lg'
          color='primary'
          shape="round"
          onClick={handlePasswordChangeClick}>
          Change Password?
        </Button> */}
        <p></p>
        <Button
          type='submit'
          variant='contained'
          className='b-radius btn btn-lg'
          color='primary'
          shape="round">
          Save Profile
        </Button>

        {/* <Stack
          sx={{ width: '70%', margin: 'auto' }}
          spacing={2}
          className='padding-top'>
          {errors.map((error) => (
            <Alert severity='error' variant='filled' key={error}>
              {error}
            </Alert>
          ))}
          {loading && (
            <Alert severity='info' variant='filled'>
              Updating... Do Not Refresh Page
            </Alert>
          )}

          {updated && (
            <Alert severity='success' variant='filled'>
              Profile Updated
            </Alert>
          )}
        </Stack> */}
    </form>
    </Grid>
    <Grid item textAlign="right" sx={{pt:10}}>
            <Button
            variant='outlined'
            className='b-radius btn btn-lg'
            color='error'
            onClick={handleOpenModel}
            >
                Delete Profile
            </Button>
    </Grid>
    <DeleteModal
        openModal={openModal}
        handleCloseModel={handleCloseModel}
        handleDelete={handleDeleteProfile}
        item='Profile'
        warningMessage='Are you sure you want to delete your profile?'
      />
    </>
    )
}

export default Profile;

// <div>
        //     <h1>Edit Profile</h1>
        //     <Form 
        //         name="updateregistration"
        //         labelCol={{
        //             span: 7,
        //         }}
        //         wrapperCol={{
        //             span: 10,
        //         }}
        //         onFinish={handleSubmit}
        //     >
        //         <Form.Item
        //             label="First Name"
        //             name="first_name"
        //                 // rules={[
        //                 // {
        //                 //     required: true,
        //                 //     message: 'Please input your first name!',
        //                 // },
        //                 // ]}
        //             >
        //             <Input name={firstName} onChange={(e) => setFirstName(e.target.value)} />
        //         </Form.Item> 
        //         <Form.Item
        //             label="Last Name"
        //             name="last_name"
        //                 // rules={[
        //                 // {
        //                 //     required: true,
        //                 //     message: 'Please input your first name!',
        //                 // },
        //                 // ]}
        //             >
        //             <Input name={lastName} onChange={(e) => setLastName(e.target.value)} />
        //         </Form.Item> 
        //         <Form.Item
        //             label="Username"
        //             name="username"
        //                 // rules={[
        //                 // {
        //                 //     required: true,
        //                 //     message: 'Please input your first name!',
        //                 // },
        //                 // ]}
        //             >
        //             <Input name={username} onChange={(e) => setUsername(e.target.value)} />
        //         </Form.Item> 
        //         <Form.Item
        //             label="Email"
        //             name="email"
        //                 // rules={[
        //                 // {
        //                 //     required: true,
        //                 //     message: 'Please input your first name!',
        //                 // },
        //                 // ]}
        //             >
        //             <Input name={email} onChange={(e) => setEmail(e.target.value)} />
        //         </Form.Item> 
        //         <div className={!togglePassword ? 'hidden' : null}>
        //         <Form.Item
        //             label="Password"
        //             name="password"
        //                 // rules={[
        //                 // {
        //                 //     required: true,
        //                 //     message: 'Please input your first name!',
        //                 // },
        //                 // ]}
        //             >
        //             <Input name={password} onChange={(e) => setPassword(e.target.value)} />
        //         </Form.Item> 
        //         <Form.Item
        //             label="Password Confirmation"
        //             name="passwordConfirmation"
        //                 // rules={[
        //                 // {
        //                 //     required: true,
        //                 //     message: 'Please input your first name!',
        //                 // },
        //                 // ]}
        //             >
        //             <Input name={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
        //         </Form.Item> 
        //             </div>
        //             <Form.Item
        //                 wrapperCol={{
        //                 offset: 8,
        //                 span: 16,
        //                 }}
        //             >
        //             <Button onClick={handlePasswordChangeClick}>
        //                 Change Password?
        //             </Button>
        //             <Button htmlType="submit">
        //                 Save Profile
        //             </Button>
        //             </Form.Item>
        //     </Form>
        //     <>
        //         <Button danger onClick={showModal} size="large">
        //             Delete Profile
        //         </Button>
        //         <Modal title="Delete Profile" visible={isModalVisible} onOk={handleDeleteProfile} onCancel={handleCancel}>
        //             <p>Are you sure?</p>
        //         </Modal>
        //     </>
        // </div>