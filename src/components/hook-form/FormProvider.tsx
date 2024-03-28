import PropTypes from "prop-types";
import React from "react";
// form
import { FormProvider as Form, UseFormReturn } from "react-hook-form";

// ----------------------------------------------------------------------

FormProvider.propTypes = {
  name: PropTypes.string,
  children: PropTypes.node.isRequired,
  methods: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
};

type Props = {
  id: string;
  children: React.ReactNode;
  methods: UseFormReturn<any, any, undefined>;
  onSubmit: () => void;
  className?: string;
};

export default function FormProvider({
  children,
  onSubmit,
  methods,
  id,
  ...props
}: Props) {
  return (
    <Form {...methods}>
      <form id={id} noValidate onSubmit={onSubmit} {...props}>
        {children}
      </form>
    </Form>
  );
}
