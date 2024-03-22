import React from "react";
import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        const { formattedValue } = values;
        const formattedNumber = formattedValue.replace(/[^\d.]/g, ""); // Remove todos os caracteres não numéricos e pontos
        const floatValue = parseFloat(formattedNumber); // Converte para um valor de ponto flutuante

        onChange({
          target: {
            name: props.name,
            value: floatValue,
          },
        });
      }}
      decimalSeparator="."
      allowNegative={false}
      decimalScale={2} // Define a escala decimal para 2
      fixedDecimalScale // Mantém a escala decimal fixa
    />
  );
});

NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export { NumericFormatCustom };
