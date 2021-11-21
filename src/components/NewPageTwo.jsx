import {
	Button,
	ButtonGroup,
	Container,
	Typography,
	TextField,
	Radio,
	FormControlLabel,
	FormLabel,
	FormControl,
	RadioGroup,
	Grid,
	Paper,
	Card,
	CardHeader,
	IconButton,
	CardContent,
} from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { pink } from "@mui/material/colors";
import { DeleteOutlined } from "@mui/icons-material";

function NewPageTwo() {
	const [category, setCategory] = useState("bed");
	return <div></div>;
	//<Container>
	//	<Typography color='textSecondary' variant='h6' component='p' gutterBottom>
	//		Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia doloremque blanditiis ad sed, saepe ducimus
	//		cupiditate explicabo eligendi a vero qui dicta aspernatur vel necessitatibus eius expedita. Autem, commodi
	//		aperiam.
	//	</Typography>
	//	<Button
	//		sx={{ backgroundColor: "pink", marginBottom: 20 + "px" }}
	//		variant='text'
	//		startIcon={<DeleteIcon color='primary' />}>
	//		two
	//	</Button>
	//	<Button variant='outlined' color='secondary' startIcon={<DeleteIcon color='success' />}>
	//		One
	//	</Button>
	//	<Button variant='contained' color='success' startIcon={<DeleteIcon color='inherit' />}>
	//		three
	//	</Button>
	//	<ButtonGroup color='primary' variant='outlined' size='small'>
	//		<Button startIcon={<DeleteIcon color='error' />}>One</Button>
	//		<Button endIcon={<DeleteIcon color='error' />}>Two</Button>
	//		<Button startIcon={<DeleteIcon color='error' />}>Three</Button>
	//	</ButtonGroup>
	//	<form noValidate autoComplete='off'>
	//		<TextField
	//			label='Name'
	//			variant='outlined'
	//			color='secondary'
	//			fullWidth
	//			required
	//			size='small'
	//			sx={{ marginY: `20px` }}
	//			error={true}
	//		/>
	//		<TextField
	//			label='Description'
	//			variant='outlined'
	//			color='secondary'
	//			multiline
	//			rows='3'
	//			fullWidth
	//			required
	//			size='small'
	//			sx={{ marginY: `20px` }}
	//		/>
	//		<Button type='submit' color='primary' variant='contained'>
	//			Submit
	//		</Button>
	//		<FormControl>
	//			<FormLabel>Change</FormLabel>
	//			<RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
	//				<FormControlLabel value='head' control={<Radio />} label='Head' />
	//				<FormControlLabel value='bed' control={<Radio />} label='Bed' />
	//				<FormControlLabel value='leg' control={<Radio />} label='Leg' />
	//			</RadioGroup>
	//		</FormControl>
	//	</form>

	//	<br />
	//	<br />
	//	<Grid container spacing={3}>
	//		<Grid item xs={12} md={6} lg={3}>
	//			<Paper sx={{ backgroundColor: "pink" }}>
	//				Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo saepe voluptate atque earum ratione nam
	//				delectus culpa corporis. Impedit pariatur tenetur error esse in deleniti molestias dignissimos porro minus
	//				sint.
	//			</Paper>
	//		</Grid>
	//		<Grid item xs={12} md={6} lg={3}>
	//			<Paper sx={{ backgroundColor: "blue" }}>
	//				Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo saepe voluptate atque earum ratione nam
	//				delectus culpa corporis. Impedit pariatur tenetur error esse in deleniti molestias dignissimos porro minus
	//				sint.
	//			</Paper>
	//		</Grid>
	//		<Grid item xs={12} md={6} lg={3}>
	//			<Paper sx={{ backgroundColor: "gray" }}>
	//				Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo saepe voluptate atque earum ratione nam
	//				delectus culpa corporis. Impedit pariatur tenetur error esse in deleniti molestias dignissimos porro minus
	//				sint.
	//			</Paper>
	//		</Grid>
	//		<Grid item xs={12} md={6} lg={3}>
	//			<Card elevation={3}>
	//				<CardHeader
	//					action={
	//						<IconButton>
	//							<DeleteOutlined />
	//						</IconButton>
	//					}
	//					title='Shrimp and Chorizo Paella'
	//					subheader='September 14, 2016'
	//				/>
	//				<CardContent>
	//					<Typography variant='body2' color='GrayText'>
	//						This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1
	//						cup of frozen peas along with the mussels, if you like.
	//					</Typography>
	//				</CardContent>
	//			</Card>
	//		</Grid>
	//		<Grid item xs={12} md={6} lg={3}>
	//			<Paper sx={{ backgroundColor: "green" }}>
	//				Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo saepe voluptate atque earum ratione nam
	//				delectus culpa corporis. Impedit pariatur tenetur error esse in deleniti molestias dignissimos porro minus
	//				sint.
	//			</Paper>
	//		</Grid>
	//	</Grid>
	//</Container>
}

export default NewPageTwo;
