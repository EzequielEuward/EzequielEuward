import { useState } from "react";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Typography, TablePagination, TextField, MenuItem, TableSortLabel, Toolbar, } from "@mui/material";
import { DeletePatientModal } from './DeletePatientModal';

//Iconos
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';

export const PatientTable = ({ patients, onViewAnamnesis, onViewPatient, onDelete }) => {

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);


  const [deleteReason, setDeleteReason] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState("dni");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeletePatient = (patient) => {
    console.log("hola mundo")
  }

  const handleViewPatient = (patient) => {
    onViewPatient(patient); 
  };
  const handleViewAnamnesis = (patient) => {
    onViewAnamnesis(patient); 
  };

  const handleOpenDeleteModal = (patient) => {
    setPatientToDelete(patient);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setPatientToDelete(null);
    setDeleteReason("");
  };

  const handleConfirmDelete = () => {
    if (deleteReason) {
      console.log(`Eliminando al paciente ${patientToDelete?.nombre} ${patientToDelete?.apellido} por el motivo: ${deleteReason}`);
      handleCloseDeleteModal();
    } else {
      alert("Por favor selecciona un motivo para la eliminación.");
    }
  };

  const filteredPatients = patients
    .filter((patient) => {
      return (
        patient.dni.toString().includes(searchQuery) ||
        patient.apellido.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.nombre.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortColumn].toString().localeCompare(b[sortColumn].toString());
      } else {
        return b[sortColumn].toString().localeCompare(a[sortColumn].toString());
      }
    });

  return (
    <Box>
      <Paper sx={{ height: "100%", width: "100%" }}>
        <Toolbar>
          <TextField
            label="Buscar"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ marginRight: 2 }}
          />
          <TextField
            select
            label="Ordenar por"
            value={sortColumn}
            onChange={(e) => setSortColumn(e.target.value)}
            size="small"
            sx={{ marginRight: 2 }}
          >
            <MenuItem value="dni">DNI</MenuItem>
            <MenuItem value="apellido">Apellido</MenuItem>
            <MenuItem value="nombre">Nombre</MenuItem>
          </TextField>
          <TextField
            select
            label="Orden"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            size="small"
          >
            <MenuItem value="asc">Ascendente</MenuItem>
            <MenuItem value="desc">Descendente</MenuItem>
          </TextField>
        </Toolbar>
        {filteredPatients.length === 0 ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <Typography variant="h6">No hay pacientes disponibles.</Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={sortColumn === "dni"}
                      direction={sortOrder}
                      onClick={() => {
                        setSortColumn("dni");
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      }}
                    >
                      DNI
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortColumn === "apellido"}
                      direction={sortOrder}
                      onClick={() => {
                        setSortColumn("apellido");
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      }}
                    >
                      Apellido
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortColumn === "nombre"}
                      direction={sortOrder}
                      onClick={() => {
                        setSortColumn("nombre");
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      }}
                    >
                      Nombre
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Sexo</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPatients
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>{patient.dni}</TableCell>
                      <TableCell>{patient.apellido}</TableCell>
                      <TableCell>{patient.nombre}</TableCell>
                      <TableCell>{patient.sexo === "m" ? "Masculino" : "Femenino"}</TableCell>
                      <TableCell>{patient.email}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleViewPatient(patient)} aria-label="ver">
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton onClick={() => handleViewAnamnesis(patient)} aria-label="ver anamnesis">
                          <SettingsAccessibilityIcon />
                        </IconButton>
                        <IconButton onClick={() => handleOpenDeleteModal(patient)} aria-label="eliminar">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredPatients.length}
              rowsPerPage={rowsPerPage}
              page={page}
              labelRowsPerPage="Páginas:"
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        )}
      </Paper>

      <DeletePatientModal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        patient={patientToDelete}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
};

export default PatientTable;
