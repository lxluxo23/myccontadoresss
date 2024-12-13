import React, { useState } from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    MenuItem,
    Button,
    Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FiltersAccordion = ({ onFilter }) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [method, setMethod] = useState("");
    const [status, setStatus] = useState("");

    const handleFilter = () => {
        onFilter({ startDate, endDate, method, status });
    };

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="filters-content"
                id="filters-header"
            >
                <strong>Filtros Avanzados</strong>
            </AccordionSummary>
            <AccordionDetails>
                <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                        label="Fecha Inicio"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                    />
                    <TextField
                        label="Fecha Fin"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                    />
                    <TextField
                        label="Método de Pago"
                        select
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                        fullWidth
                    >
                        <MenuItem value="">Todos</MenuItem>
                        <MenuItem value="Transferencia">Transferencia</MenuItem>
                        <MenuItem value="Tarjeta">Tarjeta</MenuItem>
                        <MenuItem value="Efectivo">Efectivo</MenuItem>
                        <MenuItem value="Cheque">Cheque</MenuItem>
                    </TextField>
                    <TextField
                        label="Estado"
                        select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        fullWidth
                    >
                        <MenuItem value="">Todos</MenuItem>
                        <MenuItem value="Completado">Completado</MenuItem>
                        <MenuItem value="Parcial">Parcial</MenuItem>
                        <MenuItem value="Pendiente">Pendiente</MenuItem>
                    </TextField>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleFilter}
                    >
                        Aplicar Filtros
                    </Button>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export default FiltersAccordion;
